import config from 'fakturama/config/environment';
import Ember from "ember";

const { computed, observer } = Ember;

let User = Ember.Object.extend({
  isAnonymous: computed("provider", function () {
    return this.get("provider") === "anonymous";
  }),

  emailMD5: computed("email", function () {
    return md5(this.getWithDefault("email", ""));
  }),

  gravatarURL: computed("emailMD5", function () {
    return `//www.gravatar.com/avatar/${this.get("emailMD5")}?d=mm`;
  }),

  name: computed("displayName", "email", function () {
    return this.get("displayName") || this.get("email") || "Gość";
  }),

  firebaseAuthTokenDidChange: observer("firebaseAuthToken", function () {
    window.ENV = window.ENV || {};
    window.ENV.FIREBASE_AUTH_TOKEN = this.get("firebaseAuthToken");
  }).on("init"),

  idDidChange: observer("id", function () {
    window.ENV = window.ENV || {};
    window.ENV.FIREBASE_USER_ID = this.get("id");
  }).on("init"),

  login: function (method) {
    var model = this,
      firebase = new window.Firebase(config.APP.FIREBASE_URL);

    return new Ember.RSVP.Promise(function (resolve, reject) {
      new window.FirebaseSimpleLogin(firebase, function (error, user) {
        if (error) {
          reject(error);
        } else if (user && user.provider === method) {
          resolve(user);
        }
      }).login(method);
    }).then(function (user) {
      model.setProperties($.extend({}, model.constructor.blankProperties, user));
      return model;
    });
  },

  logout: function () {
    var model = this,
      firebase = new window.Firebase(config.APP.FIREBASE_URL);

    return new Ember.RSVP.Promise(function (resolve, reject) {
      new window.FirebaseSimpleLogin(firebase, function (error, user) {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      }).logout();
    }).then(function (user) {
      return model.login("anonymous");
    });
  }
});

User.reopenClass({
  blankProperties: {
    displayName: null,
    email: null,
    firebaseAuthToken: null,
    id: null,
    md5_hash: null,
    provider: null,
    uid: null
  },

  fetch: function () {
    var model = this.create(),
      firebase = new window.Firebase(config.APP.FIREBASE_URL);

    return new Ember.RSVP.Promise(function (resolve, reject) {
      new window.FirebaseSimpleLogin(firebase, function (error, user) {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
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
