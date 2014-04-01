import User from "fakturama/models/user";

var ApplicationRoute = Ember.Route.extend({
    model: function () {
        return User.fetch().finally(window.Firebase.goOffline);
    }
});

export default ApplicationRoute;
