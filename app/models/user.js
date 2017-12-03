import { Promise as EmberPromise } from 'rsvp';
import EmberObject, { observer, computed } from '@ember/object';
import config from 'fakturama/config/environment';
import md5 from 'md5';

const firebase = new window.firebase.initializeApp(config.APP.FIREBASE);

let User = EmberObject.extend({
  isAnonymous: computed("provider", function () {
    return this.get("provider") === "anonymous";
  }),

  emailMD5: computed("email", function () {
    return md5(this.getWithDefault('email', ''));
  }),

  gravatarURL: computed("emailMD5", function () {
    return `//www.gravatar.com/avatar/${this.get("emailMD5")}?d=mm`;
  }),

  name: computed("displayName", "email", function () {
    return this.get("displayName") || this.get("email") || "Gość";
  }),

  firebaseAuthTokenDidChange: observer("firebaseAuthToken", function () {
    this.get("firebase").set("token", this.get("firebaseAuthToken"));
  }).on("init"),

  uidDidChange: observer("uid", function () {
    this.get('firebase').set("userId", this.get("uid"));
  }).on("init"),

  login() {
    var model = this;

    return new EmberPromise(function (resolve, reject) {
      const auth = firebase.auth("fakturama-e87a7");
      auth.signInAnonymously().then((user) => resolve(user),
                                    (error) => reject(error));
    }).then(function (user) {
      return user.getIdToken().then((token) => {
        model.setProperties(Object.assign({}, model.constructor.blankProperties, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          firebaseAuthToken: token
        }));
        return model;
      });
    });
  },

  logout: function () {
    var model = this;

    return new EmberPromise(function (resolve, reject) {
      new window.FirebaseSimpleLogin(firebase, function (error, user) {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      }).logout();
    }).then(function() {
      return model.login("anonymous");
    });
  }
});

User.reopenClass({
  blankProperties: {
    displayName: null,
    email: null,
    firebaseAuthToken: null,
    md5_hash: null,
    provider: null,
    uid: null
  },

  fetch: function (firebaseService) {
    var model = this.create({ firebase: firebaseService });

    return new EmberPromise(function (resolve) {
      const auth = firebase.auth();
      resolve(auth.currentUser);
    }).then(function (user) {
      if (user) {
        model.setProperties(user);
        return model;
      } else {
        return model.login("anonymous");
      }
    });
  }
});

export default User;
