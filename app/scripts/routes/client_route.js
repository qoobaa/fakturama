Faktura.ClientRoute = Ember.Route.extend({
    model: function (params) {
        return Faktura.Client.fetch(params.client_id);
    },

    setupController: function (controller, model) {
        this._super.apply(this, arguments);
        controller.set("form", Faktura.ClientForm.fromModel(model));
    }
});
