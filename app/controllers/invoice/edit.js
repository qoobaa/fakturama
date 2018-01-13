import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import ExchangeRateMixin from 'fakturama/mixins/exchange-rate';

export default Controller.extend(ExchangeRateMixin, {
  form: alias("content"),

  settings: null,
  currencies: null,
  taxRates: null,
  languages: null,
  units: null,
  clients: null,
  accounts: null,

  isRemoveItemDisabled: function () {
    return this.get("items.length") <= 1;
  }.property("items.@each"),

  actions: {
    saveRecord() {
      this.set("isSubmitted", true);

      this.get("content").save().then(() => {
        this.transitionToRoute("invoice.show", this.get("form.model"));
      });
    },

    deleteRecord() {
      const model = this.get('content.model');

      model.destroyRecord().then(() => this.transitionToRoute("invoices"));
    },

    addItem() {
      this.get("content").addItem();
    },

    removeItem(item) {
      this.get("items").removeObject(item);
    },

    chooseClient(client) {
      this.setProperties({ buyer: client.get("buyer"), buyerSignature: client.get("contactName") });
    },

    chooseAccount(account) {
      this.setProperties({
        accountBankName: account.get("bankName"),
        accountSwift: account.get("swift"),
        accountNumber: account.get("number")
      });
    }
  }
});
