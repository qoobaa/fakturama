Faktura.InvoiceRoute = Ember.Route.extend({
    model: function (params) {
        return Faktura.Invoice.fetch(params.invoice_id);
    },

    setupController: function (controller, model) {
        this._super.apply(this, arguments);
        controller.set("form", Faktura.InvoiceForm.fromModel(model));
    }
});
