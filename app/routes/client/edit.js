import Client from "faktura/models/client";
import ClientForm from "faktura/forms/client";

var ClientEditRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor("client");
    },

    setupController: function (controller, model) {
        console.log(model);
        controller.set("model", ClientForm.create({ model: model }));
    }
});

export default ClientEditRoute;
