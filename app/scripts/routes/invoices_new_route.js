Faktura.InvoicesNewRoute = Ember.Route.extend({
    model: function () {
        return Faktura.Invoice.create();
    }
});
