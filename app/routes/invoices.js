import Invoice from "faktura/models/invoice";

var InvoicesRoute = Ember.Route.extend({
    model: function () {
        return Invoice.fetch();
    }
});

export default InvoicesRoute;
