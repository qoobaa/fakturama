Faktura.ClientRoute = Ember.Route.extend({
    model: function (params) {
        return Faktura.Client.fetch(params.client_id);
    },

    setupController: function (controller, model) {
        controller.set("model", Faktura.ClientForm.create({ model: model }));
    }
});
