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
    currency: Ember.attr(),
    language: Ember.attr(),
    comment: Ember.attr()
});

Invoice.reopenClass({
    url: "invoices",
    adapter: FirebaseAdapter.create()
});

export default Invoice;
