Faktura.ApplicationRoute = Ember.Route.extend({
    beforeModel: function () {
        return this.get("auth").check();
    }
});
