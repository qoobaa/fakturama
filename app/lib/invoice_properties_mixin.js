import Item from "faktura/models/item";
import Currency from "faktura/models/currency";
import Language from "faktura/models/language";

var InvoicePropertiesMixin = Ember.Mixin.create({
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

    periodNumber: function () {
        return this.getWithDefault("number", "").match(/([^/]+)\/(.+)/)[2];
    }.property("number"),

    periodicalNumber: function () {
        return parseInt(this.getWithDefault("number", "").match(/([^/]+)\/(.+)/)[1], 10) || 0;
    }.property("number"),

    items: function () {
        return this.getWithDefault("itemsAttributes", []).map(function (itemAttributes) {
            return Item.create(itemAttributes);
        });
    }.property("itemsAttributes", "itemsAttributes.@each"),

    currency: function () {
        var code = this.get("currencyCode");
        return code && Currency.find(code);
    }.property("currencyCode"),

    language: function () {
        var code = this.get("languageCode");
        return code && Language.find(code);
    }.property("languageCode"),

    totalNetAmount: function () {
        return this.get("items").reduce(function (previousValue, item) {
            return previousValue + item.get("netAmount");
        }, 0);
    }.property("items", "items.@each.netAmount"),

    totalTaxAmount: function () {
        return this.get("items").reduce(function (previousValue, item) {
            return previousValue + item.get("taxAmount");
        }, 0);
    }.property("items", "items.@each.taxAmount"),

    totalGrossAmount: function () {
        return this.get("items").reduce(function (previousValue, item) {
            return previousValue + item.get("grossAmount");
        }, 0);
    }.property("items", "items.@each.grossAmount"),

    totalTaxAmountPLN: function () {
        if (this.get("isExchanging")) {
            return Math.round(this.get("totalTaxAmount") * this.get("exchangeRate") / (this.get("exchangeDivisor") * 10000));
        }
    }.property("totalTaxAmount", "exchangeRate", "exchangeDivisor", "isExchanging"),

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

            if (this.get("isExchanging")) {
                result.taxAmountPLN = Math.round(result.taxAmount * this.get("exchangeRate") / (this.get("exchangeDivisor") * 10000));
            }

            return result;
        }.bind(this));
    }.property("items", "items.@each.netAmount", "items.@each.taxAmount", "items.@each.grossAmount", "items.@each.taxRate", "isExchanging", "exchangeRate", "exchangeDivisor"),

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
    }.property("languageCode"),

    isExchanging: function () {
        return !!this.get("currencyCode") &&
            !!this.get("issueDate") &&
            !!this.get("totalTaxAmount") &&
            this.get("currencyCode") !== "PLN";
    }.property("currencyCode", "issueDate", "totalTaxAmount")
});

export default InvoicePropertiesMixin;
