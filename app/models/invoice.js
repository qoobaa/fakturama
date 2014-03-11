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
    buyerSignature: Ember.attr(String)
});

Invoice.reopenClass({
    url: "invoices",
    adapter: FirebaseAdapter.create()
});

export default Invoice;
