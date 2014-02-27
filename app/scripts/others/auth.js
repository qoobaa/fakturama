Faktura.Auth = Ember.Object.extend({
    didAuthenticate: function (user) {
        var model = Faktura.User.create(user);

        Faktura.config.firebaseAuthToken = user.firebaseAuthToken;
        Faktura.config.userId = user.id;

        this.container.lookup("controller:currentUser").set("content", model);
    },

    check: function () {
        var firebase = new Firebase(Faktura.config.firebaseURL);

        return new Ember.RSVP.Promise(function (resolve, reject) {
            new FirebaseSimpleLogin(firebase, function (error, user) {
                if (error) {
                    reject(error);
                } else {
                    resolve(user);
                }
            });
        }.bind(this)).then(this.didAuthenticate.bind(this));
    },

    login: function (method) {
        var firebase = new Firebase(Faktura.config.firebaseURL);

        return new Ember.RSVP.Promise(function (resolve, reject) {
            new FirebaseSimpleLogin(firebase, function (error, user) {
                if (error) {
                    reject(error);
                } else if (user) {
                    resolve(user);
                }
            }).login(method);
        }.bind(this)).then(this.didAuthenticate.bind(this));
    },

    logout: function () {
        var firebase = new Firebase(Faktura.config.firebaseURL);

        return new Ember.RSVP.Promise(function (resolve, reject) {
            new FirebaseSimpleLogin(firebase, function (error, user) {
                if (error) {
                    reject(error);
                } else {
                    resolve(user);
                }
            }).logout();
        }.bind(this)).then(this.didAuthenticate.bind(this));
    }
});
