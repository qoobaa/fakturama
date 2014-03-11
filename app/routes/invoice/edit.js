import InvoiceForm from "faktura/forms/invoice";
import Currency from "faktura/models/currency";
import TaxRate from "faktura/models/tax_rate";
import Language from "faktura/models/language";
import Unit from "faktura/models/unit";

var InvoiceEditRoute = Ember.Route.extend({
    model: function (params) {
        return Ember.RSVP.hash({
            invoice: this.modelFor("invoice"),
            currencies: Currency.fetch(),
            taxRates: TaxRate.fetch(),
            languages: Language.fetch(),
            units: Unit.fetch()
        });
    },

    setupController: function (controller, models) {
        controller.set("model", InvoiceForm.create({ model: models.invoice }));
        controller.set("currencies", models.currencies);
        controller.set("taxRates", models.taxRates);
        controller.set("languages", models.languages);
        controller.set("units", models.units);
    }
});

export default InvoiceEditRoute;
