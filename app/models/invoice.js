import FirebaseAdapter from "fakturama/adapters/firebase";
import InvoicePropertiesMixin from "fakturama/lib/invoice_properties_mixin";

var Invoice = Ember.Model.extend(InvoicePropertiesMixin, {
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
    accountBankName: Ember.attr(String),
    accountSwift: Ember.attr(String),
    accountNumber: Ember.attr(String),
    isPaid: Ember.attr(Boolean)
});

Invoice.reopenClass({
    url: "invoices",
    adapter: FirebaseAdapter.create(),

    clearCache: function () {
        this._super.apply(this, arguments);
        this._findAllRecordArray = undefined;
    }
});

export default Invoice;
