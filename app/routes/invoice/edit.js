import InvoiceForm from "fakturama/forms/invoice";
import Currency from "fakturama/models/currency";
import TaxRate from "fakturama/models/tax_rate";
import Language from "fakturama/models/language";
import Unit from "fakturama/models/unit";
import Client from "fakturama/models/client";
import Account from "fakturama/models/account";

var InvoiceEditRoute = Ember.Route.extend({
    model: function (params) {
        return Ember.RSVP.hash({
            model: this.modelFor("invoice"),
            currencies: Currency.fetch(),
            taxRates: TaxRate.fetch(),
            languages: Language.fetch(),
            units: Unit.fetch(),
            clients: Client.fetch(),
            accounts: Account.fetch()
        });
    },

    setupController: function (controller, models) {
        models.model = InvoiceForm.create({ model: models.model });
        controller.setProperties(models);
    }
});

export default InvoiceEditRoute;
