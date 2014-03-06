Faktura.SettingsRoute = Ember.Route.extend({
    model: function () {
        return Faktura.Settings.fetch();
    },

    setupController: function (controller, model) {
        this._super.apply(this, arguments);
        controller.set("form", Faktura.SettingsForm.fromModel(model));
    }
});
