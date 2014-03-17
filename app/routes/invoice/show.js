var InvoiceShowRoute = Ember.Route.extend({
    model: function (params) {
        return this.modelFor("invoice");
    }
});

export default InvoiceShowRoute;
