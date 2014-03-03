Faktura.InvoiceRoute = Ember.Route.extend({
    model: function (params) {
        return Faktura.Invoice.fetch(params.invoice_id);
    }
});
