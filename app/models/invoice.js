import Item from "faktura/models/item";
import Currency from "faktura/models/currency";
import Language from "faktura/models/language";
import FirebaseAdapter from "faktura/adapters/firebase";

var Invoice = Ember.Model.extend({
    id: Ember.attr(),
    itemsAttributes: Ember.attr(),
    items: Ember.computed.map("itemsAttributes", function (itemAttributes) {
        return Item.create(itemAttributes);
    }),
    number: Ember.attr(),
    issueDate: Ember.attr(),
    deliveryDate: Ember.attr(),
    dueDate: Ember.attr(),
    seller: Ember.attr(),
    buyer: Ember.attr(),
    currencyCode: Ember.attr(),
    currency: function () {
        var code = this.get("currencyCode");
        return code && Currency.find("code");
    }.property("currencyCode"),
    languageCode: Ember.attr(),
    language: function () {
        var code = this.get("languageCode");
        return code && Language.find("code");
    }.property("languageCode"),
    comment: Ember.attr(),
    sellerSignature: Ember.attr(),
    buyerSignature: Ember.attr()
});

Invoice.reopenClass({
    url: "invoices",
    adapter: FirebaseAdapter.create()
});

export default Invoice;
