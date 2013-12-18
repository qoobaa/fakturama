Faktura.IndexController = Ember.ArrayController.extend({
    number: "",
    dateOfIssue: undefined,
    dateOfSale: undefined,
    dueDate: undefined,

    seller: "",

    sellerFirstLine: function () {
        return this.get("seller").split("\n")[0];
    }.property("seller"),

    sellerRest: function () {
        return this.get("seller").split("\n").slice(1);
    }.property("seller"),

    buyer: "",

    buyerFirstLine: function () {
        return this.get("buyer").split("\n")[0];
    }.property("buyer"),

    buyerRest: function () {
        return this.get("buyer").split("\n").slice(1);
    }.property("buyer"),

    units: ["godzina", "usługa", "sztuka", "dzień", "rabat", "kg", "ton", "m", "km", "zaliczka", "komplet", "m²", "m³"],
    taxRates: ["23%", "8%", "5%", "0%", "n.p.", "zw."],
    currencies: ["PLN", "GBP", "USD", "EUR", "CHF", "CZK", "NOK", "SEK", "CAD", "DKK", "HUF"],

    comment: "",
    commentLines: function () {
        return this.get("comment").split("\n");
    }.property("comment"),

    totalNetAmount: function () {
        return this.get("content").reduce(function (previousValue, item) {
            return previousValue + item.get("netAmount");
        }, 0);
    }.property("content.@each.netAmount"),

    totalTaxAmount: function () {
        return this.get("content").reduce(function (previousValue, item) {
            return previousValue + item.get("taxAmount");
        }, 0);
    }.property("content.@each.taxAmount"),

    totalGrossAmount: function () {
        return this.get("content").reduce(function (previousValue, item) {
            return previousValue + item.get("grossAmount");
        }, 0);
    }.property("content.@each.grossAmount"),

    subTotals: function () {
        return this.get("taxRates").map(function (taxRate) {
            var items, netAmount, taxAmount, grossAmount;

            items = this.get("content").filterBy("formattedTaxRate", taxRate);

            netAmount = items.reduce(function (previousValue, item) {
                return previousValue + item.get("netAmount");
            }, 0);

            taxAmount = items.reduce(function (previousValue, item) {
                return previousValue + item.get("taxAmount");
            }, 0);

            grossAmount = items.reduce(function (previousValue, item) {
                return previousValue + item.get("grossAmount");
            }, 0);

            return Ember.Object.create({ formattedTaxRate: taxRate, netAmount: netAmount, taxAmount: taxAmount, grossAmount: grossAmount });
        }.bind(this)).reject(function (item) {
            return item.get("netAmount") === 0 && item.get("taxAmount") === 0 && item.get("grossAmount") === 0;
        });
    }.property("content.@each.netAmount", "content.@each.taxAmount", "content.@each.grossAmount", "content.@each.formattedTaxRate"),

    init: function () {
        this._super.apply(this, arguments);
        this.set("content", [Faktura.Item.create()]);
    },

    actions: {
        removeItem: function (item) {
            this.get("content").removeObject(item);
        },
        addItem: function () {
            this.get("content").addObject(Faktura.Item.create());
        }
    }
});
