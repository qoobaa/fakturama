import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  invoices: computed('content', function() {
    return this.get('content').filterBy('isNew', false);
  }),

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
