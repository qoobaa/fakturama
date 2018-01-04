import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import Account from "fakturama/models/account";
import Client from "fakturama/models/client";
import Invoice from "fakturama/models/invoice";
import Settings from "fakturama/models/settings";

export default Controller.extend({
  user: alias("model"),
  isAlertDismissed: false,

  clearCache: function () {
    [Account, Client, Invoice, Settings].invoke("clearCache");
  },

  goOnline: function () {
    try {
      // window.Firebase.goOnline();
    } catch (error) {
      // do nothing
    }
  },

  actions: {
    signIn: function (method) {
      var controller = this;

      controller.goOnline();

      this.get("user").login(method).then(function () {
        controller.clearCache();
        controller.transitionToRoute("invoices");
      })
        // .finally(window.Firebase.goOffline);
    },

    signOut: function () {
      var controller = this;

      controller.goOnline();

      this.get("user").logout().then(function () {
        controller.clearCache();
        controller.transitionToRoute("home");
      })
        // .finally(window.Firebase.goOffline);
    },

    dismissAlert: function () {
      this.set("isAlertDismissed", true);
    }
  }
});
