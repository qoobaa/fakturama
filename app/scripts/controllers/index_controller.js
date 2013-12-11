Faktura.IndexController = Ember.ArrayController.extend({
    number: "",
    dateOfIssue: undefined,
    dateOfSale: undefined,
    dueDate: undefined,

    currency: "CAD",

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

    comment: "",
    commentLines: function () {
        return this.get("comment").split("\n");
    }.property("comment"),

    init: function () {
        this._super.apply(this, arguments);
        this.set("content", [Faktura.Item.create()]);
    },

    actions: {

    }
});
