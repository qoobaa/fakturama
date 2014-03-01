Faktura.ClientsIndexRoute = Ember.Route.extend({
    model: function () {
        return Faktura.Client.fetch();
    }
});
