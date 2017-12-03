import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import User from "fakturama/models/user";

export default Route.extend({
  showLayout: true,
  firebase: service("firebase"),

  model: function () {
    return User.fetch(this.get('firebase'));
               // .finally(window.Firebase.goOffline);
  }
});
