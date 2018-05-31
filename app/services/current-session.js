import Service from "@ember/service";
import { computed } from "@ember/object";
import { resolve, Promise as EmberPromise } from "rsvp";

import FirebaseAuth from "fakturama/lib/firebase_auth";
import User from "fakturama/models/user";

// This service needs to be injected via app initializer under 'session' name.
// This allow us to stub ad-hoc injection in in the acceptance tests.
export default Service.extend({
  init() {
    this._super(...arguments);

    const authClass = this.getWithDefault("authClass", FirebaseAuth);
    this.set("_auth", authClass.create());
  },

  setup() {
    if(this.getWithDefault('_setup', false)) {
      return resolve()
    }

    return new EmberPromise(resolve => {
      const auth = this.get("_auth");
      auth.onAuthStateChanged(user => {
        if (user) {
          return this._setUser(user).then(resolve);
        } else {
          return this.create().then(resolve);
        }
      });
      this.set('_setup', true);
    });
  },

  currentUser: computed("userData.{user,token}", function() {
    const { user, token } = this.get("userData");
    return User.create({
      uid: user.uid,
      authToken: token,
      email: user.email,
      displayName: user.displayName,
      isAnonymous: user.isAnonymous
    });
  }),

  create(method = "anonymous") {
    const auth = this.get("_auth");
    return new EmberPromise((resolve, reject) => {
      switch(method) {
        case 'anonymous':
          auth.signInAnonymously().then(resolve, reject);
          break;
        case 'google':
          auth.signInWithGoogle().then(resolve, reject);
          break;
        default:
          reject(`Session#create with ${method} is not supported`);
      }
    });
  },

  remove() {
    const auth = this.get("_auth");
    return auth.signOut().then(() => this.create());
  },

  _setUser(user) {
    return user.getIdToken().then(token => {
      this.set("userData", { user, token });
    });
  }
});
