import Invoice from "fakturama/models/invoice";
import TaxRate from "fakturama/models/tax_rate";

var InvoicesIndexRoute = Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            model: Invoice.fetch(),
            taxRates: TaxRate.fetch()
        });
    },

    setupController: function (controller, models) {
        controller.setProperties(models);
    }
});

export default InvoicesIndexRoute;
