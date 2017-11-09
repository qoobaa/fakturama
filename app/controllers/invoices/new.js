import Ember from 'ember';
import ExchangeRateMixin from 'fakturama/mixins/exchange-rate';

const { Controller, computed: { alias } } = Ember;

export default Controller.extend(ExchangeRateMixin, {
  form: alias("content"),

  settings: null,
  currencies: null,
  taxRates: null,
  languages: null,
  units: null,
  clients: null,
  invoices: null,
  accounts: null,

  isRemoveItemDisabled: function () {
    return this.get("items.length") <= 1;
  }.property("items.@each"),

  contentDidChange: function () {
    var periodNumber, lastNumber,
      properties = {},
      controller = this;

    if (this.get("settings.numerationTypeCode") === "year") {
      periodNumber = new Date().getFullYear().toString();
    }

    if (this.get("settings.numerationTypeCode") === "month") {
      periodNumber = (new Date().getMonth() + 1).toString() + "/" + new Date().getFullYear().toString();
    }

    if (periodNumber) {
      lastNumber = this.get("invoices").filterBy("periodNumber", periodNumber).sortBy("periodicalNumber").get("lastObject.periodicalNumber") || 0;
      properties.number = (lastNumber + 1) + "/" + periodNumber;
    }

    properties.seller = this.get("settings.seller");
    properties.sellerSignature = this.get("settings.contactName");
    properties.dueDays = this.getWithDefault("settings.dueDays", 14);

    this.setProperties(properties);

    // bindings somehow don't work in minified version without Ember.run.next
    Ember.run.next(function () {
      controller.get("content").addItem();
    });
  }.observes("content"),

  actions: {
    saveRecord: function () {
      this.set("isSubmitted", true);
      this.get("content").save().then(() => this.transitionToRoute("invoices"));
    },

    addItem: function () {
      this.get("content").addItem();
    },

    removeItem: function (item) {
      this.get("items").removeObject(item);
    },

    chooseClient: function (client) {
      this.setProperties({
        buyer: client.get("buyer"),
        buyerSignature: client.get("contactName")
      });
    },

    chooseAccount: function (account) {
      this.setProperties({
        accountBankName: account.get("bankName"),
        accountSwift: account.get("swift"),
        accountNumber: account.get("number")
      });
    }
  }
});
