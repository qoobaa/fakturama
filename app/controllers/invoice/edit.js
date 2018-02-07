import Controller from '@ember/controller';
import EditController from 'fakturama/mixins/edit-controller';

export default Controller.extend(EditController, {
  transitionTo() {
    const model = this.get('content.model');
    if(model.get('isDeleted')) {
      this.transitionToRoute('invoices');
    } else {
      this.transitionToRoute('invoice.show', model);
    }
  },
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
    addItem() {
      this.get("content").addItem();
    },

    removeItem(item) {
      this.get("items").removeObject(item);
    },

    chooseClient(client) {
      this.get('model').setProperties({
        buyer: client.get("buyer"),
        buyerSignature: client.get("contactName")
      });
    },

    chooseAccount(account) {
      this.get('model').setProperties({
        accountBankName: account.get("bankName"),
        accountSwift: account.get("swift"),
        accountNumber: account.get("number")
      });
    }
  }
});
