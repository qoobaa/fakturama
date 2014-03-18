var InvoicesIndexController = Ember.ArrayController.extend({
    sortProperties: ["issueDate", "number"],
    sortAscending: true,

    actions: {
        markAsPaidInvoice: function (invoice) {
            invoice.set("isPaid", true);
            invoice.save();
        },

        markAsUnpaidInvoice: function (invoice) {
            invoice.set("isPaid", false);
            invoice.save();
        }
    }
});

export default InvoicesIndexController;
