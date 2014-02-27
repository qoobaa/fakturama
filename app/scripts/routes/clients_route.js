Faktura.ClientsRoute = Ember.Route.extend({
    model: function () {
        return Faktura.Client.find();
    }
});
