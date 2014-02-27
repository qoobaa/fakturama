Faktura.ApplicationController = Ember.Controller.extend({
    needs: ["currentUser"],

    actions: {
        signIn: function (method) {
            this.get("auth").login(method);
        },

        signOut: function () {
            this.get("auth").logout();
        }
    }
});
