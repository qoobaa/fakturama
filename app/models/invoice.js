import FirebaseAdapter from "faktura/adapters/firebase";

var Invoice = Ember.Model.extend({
    id: Ember.attr(String),
    itemsAttributes: Ember.attr(Array),
    number: Ember.attr(String),
    issueDate: Ember.attr(String),
    deliveryDate: Ember.attr(String),
    dueDate: Ember.attr(String),
    seller: Ember.attr(String),
    buyer: Ember.attr(String),
    currencyCode: Ember.attr(String),
    languageCode: Ember.attr(String),
    comment: Ember.attr(String),
    sellerSignature: Ember.attr(String),
    buyerSignature: Ember.attr(String),
    exchangeRate: Ember.attr(Number),
    exchangeDate: Ember.attr(String),
    exchangeDivisor: Ember.attr(Number),

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
    }.property("number")
});

Invoice.reopenClass({
    url: "invoices",
    adapter: FirebaseAdapter.create()
});

export default Invoice;
