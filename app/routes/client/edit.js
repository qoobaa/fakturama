import Client from "fakturama/models/client";
import ClientForm from "fakturama/forms/client";

var ClientEditRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor("client");
    },

    setupController: function (controller, model) {
        controller.set("model", ClientForm.create({ model: model }));
    }
});

export default ClientEditRoute;
