import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  sortProperties: ['issueDate', 'number'],
  sortAscending: true,

  actions: {
    markAsPaidInvoice: function (invoice) {
      invoice.set('isPaid', true);
      invoice.save();
    },

    markAsUnpaidInvoice: function (invoice) {
      invoice.set('isPaid', false);
      invoice.save();
    }
  }
});
