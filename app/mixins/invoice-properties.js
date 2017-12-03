import { all } from 'rsvp';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import { getOwner } from '@ember/application';
import Mixin from '@ember/object/mixin';
import EmberObject, { computed } from '@ember/object';
import Item from "fakturama/models/item";
import Language from "fakturama/models/language";

import polishToWords from 'polish-to-words';

export default Mixin.create({
  sellerFirstLine: computed("seller", function () {
    return this.getWithDefault("seller", "").split("\n")[0];
  }),

  sellerRest: computed("seller", function () {
    return this.getWithDefault("seller", "").split("\n").slice(1);
  }),

  buyerFirstLine: computed("buyer", function () {
    return this.getWithDefault("buyer", "").split("\n")[0];
  }),

  buyerRest: computed("buyer", function () {
    return this.getWithDefault("buyer", "").split("\n").slice(1);
  }),

  commentLines: computed("comment", function () {
    return this.getWithDefault("comment", "").split("\n");
  }),

  periodNumber: computed("number", function () {
    return this.getWithDefault("number", "").match(/([^/]+)\/(.+)/)[2];
  }),

  periodicalNumber: computed("number", function () {
    return parseInt(this.getWithDefault("number", "").match(/([^/]+)\/(.+)/)[1], 10) || 0;
  }),

  items: computed("itemsAttributes", "itemsAttributes.@each", function () {
    return this.getWithDefault("itemsAttributes", []).map((itemAttributes) => {
      return Item.create(Object.assign({}, itemAttributes, { container: getOwner(this) }));
    });
  }),

  currency: computed("currencyCode", function () {
    var code = this.get("currencyCode");
    if(code) {
      return this.get('store').queryRecord('currency', { code });
    }
  }),

  language: computed("languageCode", function () {
    var code = this.get("languageCode");
    return code && Language.find(code);
  }),

  subTotals: computed("items", "items.@each.netAmount", "items.@each.taxAmount",
                      "items.@each.grossAmount", "items.@each.taxRate",
                      "exchangeRate", "exchangeDivisor", function () {
    let results = ArrayProxy.create({ content: A([]) });

    all(this.get('items').map((item) => item.get('taxRate'))).then(() => {
      this.get('items').mapBy('taxRate').uniq().map((taxRate) => {
        const items = this.get('items').filterBy('taxRate', taxRate);
        let result = EmberObject.create({ taxRate: taxRate });

        result.set('netAmount', items.reduce(function(previousValue, item) {
          return previousValue + item.getWithDefault('netAmount', 0);
        }, 0));

        result.set('taxAmount', Math.round(result.get('netAmount') * result.get('taxRate.value') / 100));
        result.set('grossAmount', result.get('netAmount') + result.get('taxAmount'));

        if (this.get('exchangeRate')) {
          result.set('taxAmountPLN', Math.round(result.get('taxAmount') * this.get('exchangeRate') / (this.get('exchangeDivisor') * 10000)));
        }

        results.pushObject(result);
      })
    });

    return results;
  }),

  totalNetAmount: computed("subTotals", "subTotals.@each.netAmount", function () {
    return this.get("subTotals").reduce(function (previousValue, item) {
      return previousValue + item.get("netAmount");
    }, 0);
  }),

  totalTaxAmount: computed("subTotals", "subTotals.@each.taxAmount", function () {
    return this.get("subTotals").reduce(function (previousValue, item) {
      return previousValue + item.getWithDefault("taxAmount", 0);
    }, 0);
  }),

  totalGrossAmount: computed("subTotals", "subTotals.@each.grossAmount", function () {
    return this.get("subTotals").reduce(function (previousValue, item) {
      return previousValue + item.get("grossAmount");
    }, 0);
  }),

  totalTaxAmountPLN: computed("totalTaxAmount", "exchangeRate",
                              "exchangeDivisor", "isExchanging", function () {
    if (this.get("isExchanging")) {
      return Math.round(this.get("totalTaxAmount") * this.get("exchangeRate") / (this.get("exchangeDivisor") * 10000));
    }
  }),

  totalGrossAmountPLN: computed("totalGrossAmount", "exchangeRate",
                                "exchangeDivisor", "isForeignCurrency", function () {
    if (this.get("isForeignCurrency")) {
      return Math.round(this.get("totalGrossAmount") * this.get("exchangeRate") / (this.get("exchangeDivisor") * 10000));
    } else {
      return this.get("totalGrossAmount");
    }
  }),

  totalGrossAmountInWords: computed('totalGrossAmount', 'currency.code', function () {
    const amount = String(this.get('totalGrossAmount'));
    const dollars = amount.substr(0, amount.length - 2) || '0';
    const cents = amount.substr(amount.length - 2, amount.length) || '0';

    return `${polishToWords(dollars)} ${this.get('currency.code')} ${cents}/100`;
  }),

  englishTotalGrossAmountInWords: computed("totalGrossAmount", "currency.code", function () {
    var dollars, cents,
      amount = String(this.get("totalGrossAmount"));

    dollars = amount.substr(0, amount.length - 2) || "0";
    cents = amount.substr(amount.length - 2, amount.length) || "0";

    return window.toWords(dollars) + " " + this.get("currency.code") + " " + cents + "/100";
  }),

  isEnglish: computed("languageCode", function () {
    return this.get("languageCode") === "plen";
  }),

  isForeignCurrency: computed("currencyCode", function () {
    return this.get("currencyCode") !== "PLN";
  }),

  isExchanging: computed("isForeignCurrency", "issueDate", "totalTaxAmount", function () {
    return !!this.get("currencyCode") &&
      !!this.get("issueDate") &&
      !!this.get("totalTaxAmount") &&
      this.get("isForeignCurrency");
  }),

  isExpired: computed("dueDate", function () {
    return Date.parse(this.get("dueDate")) < new Date().getTime();
  }),

  isOverdue: computed("isExpired", "isPaid", function () {
    return this.get("isExpired") && !this.get("isPaid");
  })
});
