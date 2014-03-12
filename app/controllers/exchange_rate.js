import ExchangeRatesTable from "faktura/models/exchange_rates_table";

var ExchangeRateController = Ember.ObjectController.extend({
    issueDate: null,
    currencyCode: null,
    exchangeDate: null,
    exchangeDateBinding: "model.data_publikacji",

    issueDateDidChange: function () {
        if (this.get("issueDate")) {
            this.set("model", ExchangeRatesTable.find(this.get("issueDate")));
        }
    }.observes("issueDate"),

    position: function () {
        var pozycja = this.get("pozycja");

        if (pozycja) {
            return pozycja.findBy("kod_waluty", this.get("currencyCode"));
        }
    }.property("currencyCode", "pozycja"),

    exchangeRate: function () {
        var position = this.get("position");
        if (position) {
            return parseInt(position.kurs_sredni.replace(",", ""), 10);
        }
    }.property("position"),

    exchangeDivisor: function () {
        var position = this.get("position");

        if (position) {
            return parseInt(position.przelicznik, 10);
        }
    }.property("position")
});

export default ExchangeRateController;
