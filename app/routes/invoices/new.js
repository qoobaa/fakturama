import Invoice from "faktura/models/invoice";
import InvoiceForm from "faktura/forms/invoice";
import Currency from "faktura/models/currency";
import TaxRate from "faktura/models/tax_rate";
import Language from "faktura/models/language";
import Unit from "faktura/models/unit";
import Settings from "faktura/models/settings";

var InvoicesNewRoute = Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            model: Invoice.create(),
            currencies: Currency.fetch(),
            taxRates: TaxRate.fetch(),
            languages: Language.fetch(),
            units: Unit.fetch(),
            settings: Settings.fetch()
        });
    },

    setupController: function (controller, models) {
        models.model = InvoiceForm.create({ model: models.model });
        controller.setProperties(models);
    }
});

export default InvoicesNewRoute;
