Faktura.InvoiceRoute = Ember.Route.extend({
    model: function (params) {
        return Faktura.Invoice.fetch(params.invoice_id);
    },

    setupController: function (controller, model) {
        controller.set("model", Faktura.InvoiceForm.create({ model: model }));
    }
});
