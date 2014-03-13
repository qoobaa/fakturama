import InvoiceForm from "faktura/forms/invoice";
import Currency from "faktura/models/currency";
import TaxRate from "faktura/models/tax_rate";
import Language from "faktura/models/language";
import Unit from "faktura/models/unit";
import Client from "faktura/models/client";

var InvoiceEditRoute = Ember.Route.extend({
    model: function (params) {
        return Ember.RSVP.hash({
            model: this.modelFor("invoice"),
            currencies: Currency.fetch(),
            taxRates: TaxRate.fetch(),
            languages: Language.fetch(),
            units: Unit.fetch(),
            clients: Client.fetch()
        });
    },

    setupController: function (controller, models) {
        models.model = InvoiceForm.create({ model: models.model });
        controller.setProperties(models);
    }
});

export default InvoiceEditRoute;
