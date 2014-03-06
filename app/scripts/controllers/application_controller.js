Faktura.ApplicationController = Ember.Controller.extend({
    needs: ["currentUser"],

    actions: {
        signIn: function (method) {
            var controller = this;

            this.get("controllers.currentUser.content").login(method).then(function () {
                controller.transitionToRoute("index");
            });
        },

        signOut: function () {
            var controller = this;

            this.get("controllers.currentUser.content").logout().then(function () {
                controller.transitionToRoute("index");
            });
        }
    }
});
