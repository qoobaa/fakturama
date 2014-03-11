import Item from "faktura/models/item";
import ItemPresenter from "faktura/presenters/item";
import Currency from "faktura/models/currency";
import Language from "faktura/models/language";

var InvoicePresenter = Ember.ObjectProxy.extend({
    model: Ember.computed.alias("content"),

    items: Ember.computed.map("model.itemsAttributes", function (itemAttributes) {
        return ItemPresenter.create({ model: Item.create(itemAttributes) });
    }),

    currency: function () {
        var code = this.get("currencyCode");
        return code && Currency.find(code);
    }.property("currencyCode"),

    language: function () {
        var code = this.get("languageCode");
        return code && Language.find(code);
    }.property("languageCode"),

    netAmounts: Ember.computed.mapBy("items", "netAmount"),
    totalNetAmount: Ember.computed.sum("netAmounts"),

    taxAmounts: Ember.computed.mapBy("items", "taxAmount"),
    totalTaxAmount: Ember.computed.sum("taxAmounts"),

    grossAmounts: Ember.computed.mapBy("items", "grossAmount"),
    totalGrossAmount: Ember.computed.sum("grossAmounts"),

    subTotals: function () {
        return this.get("items").mapBy("taxRate").uniq().map(function (taxRate) {
            var items,
                result = Ember.Object.create({ taxRate: taxRate });

            items = this.get("items").filterBy("taxRate", taxRate);

            result.netAmount = items.reduce(function (previousValue, item) {
                return previousValue + item.get("netAmount");
            }, 0);

            result.taxAmount = items.reduce(function (previousValue, item) {
                return previousValue + item.get("taxAmount");
            }, 0);

            result.grossAmount = items.reduce(function (previousValue, item) {
                return previousValue + item.get("grossAmount");
            }, 0);

            return result;
        }.bind(this));
    }.property("items", "items.@each.netAmount", "items.@each.taxAmount", "items.@each.grossAmount", "items.@each.taxRate"),

    sellerFirstLine: function () {
        return this.getWithDefault("seller", "").split("\n")[0];
    }.property("seller"),

    sellerRest: function () {
        return this.getWithDefault("seller", "").split("\n").slice(1);
    }.property("seller"),

    buyerFirstLine: function () {
        return this.getWithDefault("buyer", "").split("\n")[0];
    }.property("buyer"),

    buyerRest: function () {
        return this.getWithDefault("buyer", "").split("\n").slice(1);
    }.property("buyer"),

    commentLines: function () {
        return this.getWithDefault("comment", "").split("\n");
    }.property("comment"),

    totalGrossAmountInWords: function () {
        var dollars, cents,
            amount = String(this.get("totalGrossAmount"));

        dollars = amount.substr(0, amount.length - 2) || "0";
        cents = amount.substr(amount.length - 2, amount.length) || "0";

        return window.polishToWords(dollars) + " " + this.get("currency.code") + " " + cents + "/100";
    }.property("totalGrossAmount", "currency.code"),

    englishTotalGrossAmountInWords: function () {
        var dollars, cents,
            amount = String(this.get("totalGrossAmount"));

        dollars = amount.substr(0, amount.length - 2) || "0";
        cents = amount.substr(amount.length - 2, amount.length) || "0";

        return window.toWords(dollars) + " " + this.get("currency.code") + " " + cents + "/100";
    }.property("totalGrossAmount", "currency.code"),

    isEnglish: function () {
        return this.get("languageCode") === "plen";
    }.property("languageCode")
});

export default InvoicePresenter;
