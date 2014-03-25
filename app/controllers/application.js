import Account from "fakturama/models/account";
import Client from "fakturama/models/client";
import Invoice from "fakturama/models/invoice";
import Settings from "fakturama/models/settings";

var ApplicationController = Ember.ObjectController.extend({
    user: Ember.computed.alias("model"),
    isAlertDismissed: false,

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
        },

        dismissAlert: function () {
            this.set("isAlertDismissed", true);
        },

        importDatabase: function (data) {
            var url = "%@%@/.json?auth=%@".fmt(window.ENV.FIREBASE_URL, window.ENV.FIREBASE_USER_ID, window.ENV.FIREBASE_AUTH_TOKEN),
                controller = this;

            $.ajax(url, { type: "PUT", data: data })
                .done(function () {
                    controller.clearCache();
                    controller.transitionToRoute("invoices");
                });
        },

        deleteDatabase: function () {
            var url = "%@%@/.json?auth=%@".fmt(window.ENV.FIREBASE_URL, window.ENV.FIREBASE_USER_ID, window.ENV.FIREBASE_AUTH_TOKEN),
                controller = this;

            $.ajax(url, { type: "DELETE" })
                .done(function () {
                    controller.clearCache();
                    controller.transitionToRoute("invoices");
                });
        }
    }
});

export default ApplicationController;
