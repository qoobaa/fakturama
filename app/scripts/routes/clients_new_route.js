Faktura.ClientsNewRoute = Ember.Route.extend({
    model: function () {
        return Faktura.Client.create();
    }
});
