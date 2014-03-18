var ApplicationController = Ember.Controller.extend({
    user: Ember.computed.alias("model"),

    actions: {
        signIn: function (method) {
            var controller = this;

            this.get("user").login(method).then(function () {
                controller.transitionToRoute("index");
            });
        },

        signOut: function () {
            var controller = this;

            this.get("user").logout().then(function () {
                controller.transitionToRoute("index");
            });
        }
    }
});

export default ApplicationController;
