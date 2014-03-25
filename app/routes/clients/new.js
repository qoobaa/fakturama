import Client from "fakturama/models/client";
import ClientForm from "fakturama/forms/client";

var ClientsNewRoute = Ember.Route.extend({
    model: function () {
        return Client.create();
    },

    setupController: function (controller, model) {
        controller.set("model", ClientForm.create({ model: model }));
    }
});

export default ClientsNewRoute;
