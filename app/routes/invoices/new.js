import Invoice from "fakturama/models/invoice";
import InvoiceForm from "fakturama/forms/invoice";
import Currency from "fakturama/models/currency";
import TaxRate from "fakturama/models/tax_rate";
import Language from "fakturama/models/language";
import Unit from "fakturama/models/unit";
import Settings from "fakturama/models/settings";
import Client from "fakturama/models/client";
import Account from "fakturama/models/account";

var InvoicesNewRoute = Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            model: Invoice.create(),
            currencies: Currency.fetch(),
            taxRates: TaxRate.fetch(),
            languages: Language.fetch(),
            units: Unit.fetch(),
            settings: Settings.fetch(),
            clients: Client.fetch(),
            accounts: Account.fetch(),
            invoices: Invoice.fetch()
        });
    },

    setupController: function (controller, models) {
        models.model = InvoiceForm.create({ model: models.model });
        controller.setProperties(models);
    }
});

export default InvoicesNewRoute;
