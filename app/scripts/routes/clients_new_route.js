Faktura.ClientsNewRoute = Ember.Route.extend({
    model: function () {
        return Faktura.Client.create();
    },

    setupController: function (controller, model) {
        this._super.apply(this, arguments);
        controller.set("form", Faktura.ClientForm.fromModel(model));
    }
});
