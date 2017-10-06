import Ember from "ember";
import User from "fakturama/models/user";

const { Route, inject: { service } } = Ember;

export default Route.extend({
  firebase: service("firebase"),

  model: function () {
    return User.fetch(this.get('firebase'));
               // .finally(window.Firebase.goOffline);
  }
});
