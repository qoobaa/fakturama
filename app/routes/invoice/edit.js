import InvoiceForm from "faktura/forms/invoice";
import Currency from "faktura/models/currency";

var InvoiceEditRoute = Ember.Route.extend({
    model: function (params) {
        return Ember.RSVP.hash({
            invoice: this.modelFor("invoice"),
            currencies: Currency.fetch()
        });
    },

    setupController: function (controller, models) {
        controller.set("model", InvoiceForm.create({ model: models.invoice }));
        controller.set("currencies", models.currencies);
    }
});

export default InvoiceEditRoute;
