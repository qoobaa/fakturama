import Client from "faktura/models/client";

var ClientsRoute = Ember.Route.extend({
    model: function () {
        return Client.fetch();
    }
});

export default ClientsRoute;
