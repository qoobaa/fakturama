import Client from "fakturama/models/client";

var ClientsIndexRoute = Ember.Route.extend({
    model: function () {
        return Client.fetch();
    }
});

export default ClientsIndexRoute;
