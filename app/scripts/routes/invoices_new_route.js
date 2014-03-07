Faktura.InvoicesNewRoute = Ember.Route.extend({
    model: function () {
        return Faktura.Invoice.create();
    },

    setupController: function (controller, model) {
        controller.set("model", Faktura.InvoiceForm.create({ model: model }));
    }
});
