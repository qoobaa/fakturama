import Client from "faktura/models/client";

var ClientRoute = Ember.Route.extend({
    model: function (params) {
        return Client.fetch(params.client_id);
    }
});

export default ClientRoute;
