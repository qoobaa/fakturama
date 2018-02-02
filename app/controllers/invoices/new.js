import { next } from '@ember/runloop';
import Controller from '@ember/controller';
import ExchangeRateMixin from 'fakturama/mixins/exchange-rate';
import NewController from 'fakturama/mixins/new-controller';

export default Controller.extend(NewController, ExchangeRateMixin, {
  transitionTo() {
    this.transitionToRoute('invoice.show', this.get('content.model'));
  },
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
    let periodNumber, lastNumber, properties = {};

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

    let model = this.get('model');
    if (model) model.setProperties(properties);

    // bindings somehow don't work in minified version without Ember.run.next
    next(() => {
      let content = this.get("content");
      if (content) content.addItem();
    });
  }.observes("content"),

  actions: {
    addItem() {
      this.get("model").addItem();
    },

    removeItem(item) {
      this.get("model.items").removeObject(item);
    },

    chooseClient: function (client) {
      this.get('model').setProperties({
        buyer: client.get("buyer"),
        buyerSignature: client.get("contactName")
      });
    },

    chooseAccount: function (account) {
      this.get('model').setProperties({
        accountBankName: account.get("bankName"),
        accountSwift: account.get("swift"),
        accountNumber: account.get("number")
      });
    }
  }
});
