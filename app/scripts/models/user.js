Faktura.User = Ember.Object.extend({
    gravatarURL: function () {
        return "//www.gravatar.com/avatar/" + this.getWithDefault("md5_hash", "") + "?d=mm";
    }.property("md5_hash"),

    name: function () {
        return this.get("displayName") || this.get("email");
    }.property("displayName", "email"),

    firebaseAuthTokenDidChange: function () {
        Faktura.config.firebaseAuthToken = this.get("firebaseAuthToken");
    }.observes("firebaseAuthToken").on("init"),

    idDidChange: function () {
        Faktura.config.userId = this.get("id");
    }.observes("id").on("init"),

    login: function (method) {
        var model = this,
            firebase = new Firebase(Faktura.config.firebaseURL);

        return new Ember.RSVP.Promise(function (resolve, reject) {
            new FirebaseSimpleLogin(firebase, function (error, user) {
                if (error) {
                    reject(error);
                } else if (user) {
                    model.setProperties(model.constructor.blankProperties);
                    model.setProperties(user);
                    resolve(model);
                }
            }).login(method);
        });
    },

    logout: function () {
        var model = this,
            firebase = new Firebase(Faktura.config.firebaseURL);

        return new Ember.RSVP.Promise(function (resolve, reject) {
            new FirebaseSimpleLogin(firebase, function (error, user) {
                if (error) {
                    reject(error);
                } else {
                    model.setProperties(model.constructor.blankProperties);
                    resolve(model);
                }
            }).logout();
        });
    }
});

Faktura.User.reopenClass({
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
        var userClass = this,
            firebase = new Firebase(Faktura.config.firebaseURL);

        return new Ember.RSVP.Promise(function (resolve, reject) {
            new FirebaseSimpleLogin(firebase, function (error, user) {
                if (error) {
                    reject(error);
                } else {
                    resolve(userClass.create(user));
                }
            });
        });
    }
});
