Faktura.SettingsRoute = Ember.Route.extend({
    model: function () {
        return Faktura.Settings.fetch();
    },

    setupController: function (controller, model) {
        controller.set("model", Faktura.SettingsForm.create({ model: model }));
    }
});
