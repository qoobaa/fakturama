import User from "faktura/models/user";

var ApplicationRoute = Ember.Route.extend({
    model: function () {
        return User.fetch();
    }
});

export default ApplicationRoute;
