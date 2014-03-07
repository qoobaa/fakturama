Faktura.ClientsNewRoute = Ember.Route.extend({
    model: function () {
        return Faktura.Client.create();
    },

    setupController: function (controller, model) {
        controller.set("model", Faktura.ClientForm.create({ model: model }));
    }
});
