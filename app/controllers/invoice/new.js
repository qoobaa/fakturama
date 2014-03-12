import ItemForm from "faktura/forms/item";
import ExchangeRatesTable from "faktura/models/exchange_rates_table";

var InvoiceNewController = Ember.ObjectController.extend({
    isRemoveItemDisabled: function () {
        return this.get("items.length") <= 1;
    }.property("items.@each"),

    issueDateDidChange: function () {
        if (this.get("issueDate")) {
            this.set("exchangeRatesTable", ExchangeRatesTable.find(this.get("issueDate")));
        }
    }.observes("issueDate"),

    exchangeRatesTablePozycjaOrIsExchangeRequiredDidChange: function () {
        var pozycja,
            currencyCode = this.get("currencyCode"),
            exchangeRatesTable = this.get("exchangeRatesTable");

        if (this.get("isExchanging") && exchangeRatesTable && exchangeRatesTable.get("pozycja")) {
            pozycja = exchangeRatesTable.get("pozycja").findBy("kod_waluty", currencyCode);
            if (pozycja) {
                this.setProperties({
                    exchangeDate: exchangeRatesTable.get("data_publikacji"),
                    exchangeRate: parseInt(pozycja.kurs_sredni.replace(",", ""), 10),
                    exchangeDivisor: parseInt(pozycja.przelicznik, 10)
                });
            }
        } else {
            this.setProperties({ exchangeDate: null, exchangeRate: null, exchangeDivisor: null });
        }
    }.observes("exchangeRatesTable.pozycja", "isExchanging"),

    actions: {
        saveRecord: function () {
            var controller = this;

            this.set("isSubmitted", true);

            this.get("content").save().then(function () {
                controller.transitionToRoute("invoices");
            });
        },

        addItem: function () {
            this.get("content").addItem();
        },

        removeItem: function (item) {
            this.get("items").removeObject(item);
        }
    }
});

export default InvoiceNewController;
