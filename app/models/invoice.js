import Currency from "faktura/models/currency";
import FirebaseAdapter from "faktura/adapters/firebase";

var Invoice = Ember.Model.extend({
    id: Ember.attr(),
    items: Ember.attr(),
    number: Ember.attr(),
    issueDate: Ember.attr(),
    deliveryDate: Ember.attr(),
    dueDate: Ember.attr(),
    seller: Ember.attr(),
    buyer: Ember.attr(),
    currency: Ember.belongsTo(Currency, { key: "currency" }),
    language: Ember.attr(),
    comment: Ember.attr(),
    sellerSignature: Ember.attr(),
    buyerSignature: Ember.attr()
});

Invoice.reopenClass({
    url: "invoices",
    adapter: FirebaseAdapter.create()
});

export default Invoice;
