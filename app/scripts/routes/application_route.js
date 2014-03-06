Faktura.ApplicationRoute = Ember.Route.extend({
    beforeModel: function () {
        var currentUserController = this.controllerFor("currentUser");

        return Faktura.User.fetch().then(function (user) {
            currentUserController.set("content", user);
        });
        // return this.get("auth").check();
    }
});
