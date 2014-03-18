import Account from "faktura/models/account";
import Client from "faktura/models/client";
import Invoice from "faktura/models/invoice";
import Settings from "faktura/models/settings";

var ApplicationController = Ember.Controller.extend({
    user: Ember.computed.alias("model"),

    clearCache: function () {
        [Account, Client, Invoice, Settings].invoke("clearCache");
    },

    actions: {
        signIn: function (method) {
            var controller = this;

            this.get("user").login(method).then(function () {
                controller.clearCache();
                controller.transitionToRoute("index");
            });
        },

        signOut: function () {
            var controller = this;

            this.get("user").logout().then(function () {
                controller.clearCache();
                controller.transitionToRoute("index");
            });
        }
    }
});

export default ApplicationController;
