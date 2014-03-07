Faktura.InvoicesNewRoute = Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            settings: Faktura.Settings.fetch(),
            invoice: Faktura.Invoice.create()
        });
    },

    setupController: function (controller, models) {
        controller.set("model", models.invoice);
        controller.set("form", Faktura.InvoiceForm.fromModel(models.invoice).setDefaults(models.settings));
    }
});
