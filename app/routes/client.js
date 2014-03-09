import Client from "faktura/models/client";
import ClientForm from "faktura/forms/client";

var ClientRoute = Ember.Route.extend({
    model: function (params) {
        return Client.fetch(params.client_id);
    },

    setupController: function (controller, model) {
        controller.set("model", ClientForm.create({ model: model }));
    }
});

export default ClientRoute;
