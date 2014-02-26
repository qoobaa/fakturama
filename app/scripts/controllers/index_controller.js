Faktura.IndexController = Ember.Controller.extend({
    needs: ["currentUser"],

    actions: {
        check: function () {
            this.get("auth").check().then(function (user) {
                console.log(user);
            });
        },
        login: function (method) {
            this.get("auth").login(method).then(function (user) {
                console.log(user);
            });
        },
        logout: function () {
            this.get("auth").logout().then(function (user) {
                console.log(user);
            });
        }
    }
});
