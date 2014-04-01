var IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo("invoices");
    }
});

export default IndexRoute;
