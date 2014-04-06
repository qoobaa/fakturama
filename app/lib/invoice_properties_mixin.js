import Item from "fakturama/models/item";
import Currency from "fakturama/models/currency";
import Language from "fakturama/models/language";

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

    subTotals: function () {
        return this.get("items").mapBy("taxRate").uniq().map(function (taxRate) {
            var items,
                result = Ember.Object.create({ taxRate: taxRate });

            items = this.get("items").filterBy("taxRate", taxRate);

            result.set("netAmount", items.reduce(function (previousValue, item) {
                return previousValue + item.get("netAmount");
            }, 0));

            result.set("taxAmount", Math.round(result.get("netAmount") * result.get("taxRate.value") / 100));

            result.set("grossAmount", result.get("netAmount") + result.get("taxAmount"));

            if (this.get("exchangeRate")) {
                result.set("taxAmountPLN", Math.round(result.get("taxAmount") * this.get("exchangeRate") / (this.get("exchangeDivisor") * 10000)));
            }

            return result;
        }.bind(this));
    }.property("items", "items.@each.netAmount", "items.@each.taxAmount", "items.@each.grossAmount", "items.@each.taxRate", "exchangeRate", "exchangeDivisor"),

    totalNetAmount: function () {
        return this.get("subTotals").reduce(function (previousValue, item) {
            return previousValue + item.get("netAmount");
        }, 0);
    }.property("subTotals", "subTotals.@each.netAmount"),

    totalTaxAmount: function () {
        return this.get("subTotals").reduce(function (previousValue, item) {
            return previousValue + item.get("taxAmount");
        }, 0);
    }.property("subTotals", "subTotals.@each.taxAmount"),

    totalGrossAmount: function () {
        return this.get("subTotals").reduce(function (previousValue, item) {
            return previousValue + item.get("grossAmount");
        }, 0);
    }.property("subTotals", "subTotals.@each.grossAmount"),

    totalTaxAmountPLN: function () {
        if (this.get("isExchanging")) {
            return Math.round(this.get("totalTaxAmount") * this.get("exchangeRate") / (this.get("exchangeDivisor") * 10000));
        }
    }.property("totalTaxAmount", "exchangeRate", "exchangeDivisor", "isExchanging"),

    totalGrossAmountPLN: function () {
        if (this.get("isForeignCurrency")) {
            return Math.round(this.get("totalGrossAmount") * this.get("exchangeRate") / (this.get("exchangeDivisor") * 10000));
        } else {
            return this.get("totalGrossAmount");
        }
    }.property("totalGrossAmount", "exchangeRate", "exchangeDivisor", "isForeignCurrency"),

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

    isForeignCurrency: function () {
        return this.get("currencyCode") !== "PLN";
    }.property("currencyCode"),

    isExchanging: function () {
        return !!this.get("currencyCode") &&
            !!this.get("issueDate") &&
            !!this.get("totalTaxAmount") &&
            this.get("isForeignCurrency");
    }.property("isForeignCurrency", "issueDate", "totalTaxAmount"),

    isExpired: function () {
        return Date.parse(this.get("dueDate")) < new Date().getTime();
    }.property("dueDate"),

    isOverdue: function () {
        return this.get("isExpired") && !this.get("isPaid");
    }.property("isExpired", "isPaid")
});

export default InvoicePropertiesMixin;
