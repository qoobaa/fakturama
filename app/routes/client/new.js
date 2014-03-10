import Client from "faktura/models/client";
import ClientForm from "faktura/forms/client";

var ClientNewRoute = Ember.Route.extend({
    model: function () {
        return Client.create();
    },

    setupController: function (controller, model) {
        controller.set("model", ClientForm.create({ model: model }));
    }
});

export default ClientNewRoute;
