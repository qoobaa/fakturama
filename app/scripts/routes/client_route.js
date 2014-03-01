Faktura.ClientRoute = Ember.Route.extend({
    model: function (params) {
        return Faktura.Client.fetch(params.client_id);
    }
});
