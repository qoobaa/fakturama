var User = Ember.Object.extend({
    isAnonymous: function () {
        return this.get("provider") === "anonymous";
    }.property("email"),

    gravatarURL: function () {
        return "//www.gravatar.com/avatar/" + this.getWithDefault("md5_hash", "") + "?d=mm";
    }.property("md5_hash"),

    name: function () {
        return this.get("displayName") || this.get("email") || "Gość";
    }.property("displayName", "email"),

    firebaseAuthTokenDidChange: function () {
        window.ENV.FIREBASE_AUTH_TOKEN = this.get("firebaseAuthToken");
    }.observes("firebaseAuthToken").on("init"),

    idDidChange: function () {
        window.ENV.FIREBASE_USER_ID = this.get("id");
    }.observes("id").on("init"),

    login: function (method) {
        var model = this,
            firebase = new window.Firebase(window.ENV.FIREBASE_URL);

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
            firebase = new window.Firebase(window.ENV.FIREBASE_URL);

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
            firebase = new window.Firebase(window.ENV.FIREBASE_URL);

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
