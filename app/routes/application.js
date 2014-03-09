import User from "faktura/models/user";

var ApplicationRoute = Ember.Route.extend({
    beforeModel: function () {
        var currentUserController = this.controllerFor("currentUser"),
            settingsController = this.controllerFor("settings");

        return User.fetch().then(function (user) {
            currentUserController.set("content", user);
        });
    }
});

export default ApplicationRoute;
