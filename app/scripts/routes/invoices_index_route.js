Faktura.InvoicesIndexRoute = Ember.Route.extend({
    model: function () {
        return Faktura.Invoice.fetch();
    }
});
