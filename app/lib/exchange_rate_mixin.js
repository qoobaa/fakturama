import ExchangeRatesTable from "faktura/models/exchange_rates_table";

var ExchangeRateMixin = Ember.Mixin.create({
    issueDateDidChange: function () {
        if (this.get("issueDate")) {
            this.set("exchangeRateTable", ExchangeRatesTable.find(this.get("issueDate")));
        }
    }.observes("issueDate"),

    exchangeRateCurrencyDidChange: function () {
        var exchangeDate = null,
            exchangeRate = null,
            exchangeDivisor = null,
            currency = this.getWithDefault("exchangeRateTable.pozycja", []).findBy("kod_waluty", this.get("currencyCode"));

        if (currency) {
            exchangeDate = this.get("exchangeRateTable.data_publikacji");
            exchangeRate = parseInt(currency.kurs_sredni.replace(",", ""), 10);
            exchangeDivisor = parseInt(currency.przelicznik, 10);
        }
        this.setProperties({ exchangeDate: exchangeDate, exchangeRate: exchangeRate, exchangeDivisor: exchangeDivisor });
    }.observes("currencyCode", "exchangeRateTable.pozycja")
});

export default ExchangeRateMixin;
