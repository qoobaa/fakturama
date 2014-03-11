import Invoice from "faktura/models/invoice";
import InvoiceForm from "faktura/forms/invoice";
import Currency from "faktura/models/currency";

var InvoiceNewRoute = Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            invoice: Invoice.create(),
            currencies: Currency.fetch()
        });
    },

    setupController: function (controller, models) {
        controller.set("model", InvoiceForm.create({ model: models.invoice }));
        controller.set("currencies", models.currencies);
    }
});

export default InvoiceNewRoute;
