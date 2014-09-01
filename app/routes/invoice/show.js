var InvoiceShowRoute = Ember.Route.extend({
    model: function (params) {
        return this.modelFor("invoice");
    },
    activate: function () {
        var invoice = this.modelFor("invoice");

        document.title = [invoice.get("number"), invoice.get("buyerFirstLine"), "- Fakturama"].compact().join(" ");
    },
    deactivate: function () {
        document.title = "Fakturama";
    }
});

export default InvoiceShowRoute;
