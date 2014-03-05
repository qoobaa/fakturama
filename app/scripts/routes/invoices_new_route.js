Faktura.InvoicesNewRoute = Ember.Route.extend({
    model: function () {
        return Faktura.Invoice.create({ items: [{}] });
    },

    setupController: function (controller, model) {
        this._super.apply(this, arguments);
        controller.set("form", Faktura.InvoiceForm.fromModel(model));
    }
});
