Faktura.ApplicationRoute = Ember.Route.extend({
    beforeModel: function () {
        var currentUserController = this.controllerFor("currentUser"),
            settingsController = this.controllerFor("settings");

        return Faktura.User.fetch().then(function (user) {
            currentUserController.set("content", user);
            return Faktura.Settings.fetch();
        }).then(function (settings) {
            settingsController.set("content", settings);
        });
    }
});
