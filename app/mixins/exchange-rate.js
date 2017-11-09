import Ember from 'ember';
import ExchangeRatesTable from 'fakturama/models/exchange-rates-table';

const { Mixin, observer } = Ember;

export default Mixin.create({
  issueDateDidChange: observer("issueDate", function () {
    if (this.get("issueDate")) {
      this.set("exchangeRateTable", ExchangeRatesTable.find(this.get("issueDate")));
    }
  }),

  exchangeRateCurrencyDidChange: observer("currencyCode", "exchangeRateTable.pozycja", function () {
    var exchangeDate = null,
      exchangeRate = null,
      exchangeDivisor = null,
      currency = this.getWithDefault("exchangeRateTable.pozycja", []).findBy("kod_waluty", this.get("currencyCode"));

    if (currency) {
      exchangeDate = this.get("exchangeRateTable.data_publikacji");
      exchangeRate = parseInt(currency.kurs_sredni.replace(",", ""), 10);
      exchangeDivisor = parseInt(currency.przelicznik, 10);
    }
    this.setProperties({
      exchangeDate: exchangeDate,
      exchangeRate: exchangeRate,
      exchangeDivisor: exchangeDivisor
    });
  })
});
