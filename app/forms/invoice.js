import Item from "fakturama/models/item";
import ItemForm from "fakturama/forms/item";
import Currency from "fakturama/models/currency";
import Language from "fakturama/models/language";
import FormMixin from "fakturama/mixins/form";
import InvoicePropertiesMixin from "fakturama/mixins/invoice-properties";

var InvoiceForm = Ember.ObjectProxy.extend(Ember.Validations.Mixin, FormMixin, InvoicePropertiesMixin, {
    validations: {
        number: {
            presence: {
                if: "isSubmitted",
                message: "nie może być pusty"
            }
        },
        issueDate: {
            presence: {
                if: "isSubmitted",
                message: "nie może być pusta"
            }
        },
        deliveryDate: {
            presence: {
                if: "isSubmitted",
                message: "nie może być pusta"
            }
        },
        dueDays: {
            presence: {
                if: "isSubmitted",
                message: "nie może być pusta"
            },
            numericality: {
                if: "isSubmitted",
                greaterThanOrEqualTo: 0,
                messages: {
                    greaterThanOrEqualTo: "nie może być ujemny"
                }
            }
        },
        seller: {
            presence: {
                if: "isSubmitted",
                message: "nie może być pusty"
            }
        },
        buyer: {
            presence: {
                if: "isSubmitted",
                message: "nie może być pusty"
            }
        },
        currencyCode: {
            presence: {
                if: "isSubmitted",
                message: "nie może być pusta"
            }
        },
        languageCode: {
            presence: {
                if: "isSubmitted",
                message: "nie może być pusta"
            }
        },
        exchangeDate: {
            presence: {
                if: function (invoice) {
                    return invoice.get("isSubmitted") && invoice.get("isExchanging");
                },
                message: "nie może być pusta"
            }
        }
    },

    id: Ember.computed.oneWay("model.id"),
    number: Ember.computed.oneWay("model.number"),
    issueDate: Ember.computed.oneWay("model.issueDate"),
    deliveryDate: Ember.computed.oneWay("model.deliveryDate"),
    seller: Ember.computed.oneWay("model.seller"),
    buyer: Ember.computed.oneWay("model.buyer"),
    currencyCode: Ember.computed.oneWay("model.currencyCode"),
    languageCode: Ember.computed.oneWay("model.languageCode"),
    accountBankName: Ember.computed.oneWay("model.accountBankName"),
    accountSwift: Ember.computed.oneWay("model.accountSwift"),
    accountNumber: Ember.computed.oneWay("model.accountNumber"),
    isPaid: Ember.computed.oneWay("model.isPaid"),

    items: function () {
        var invoiceForm = this;

        return this.getWithDefault("model.itemsAttributes", []).map(function (itemAttributes) {
            return ItemForm.create({ model: Item.create(itemAttributes), invoiceForm: invoiceForm });
        });
    }.property("model.itemsAttributes", "model.itemsAttributes.@each"),

    itemsAttributes: function () {
        return this.get("items").invoke("toJSON");
    }.property("items", "items.@each"),

    comment: Ember.computed.oneWay("model.comment"),
    sellerSignature: Ember.computed.oneWay("model.sellerSignature"),
    buyerSignature: Ember.computed.oneWay("model.buyerSignature"),

    isSubmitted: false,
    isIssueDelivery: true,
    dueDays: 14,

    initIssueDate: function () {
        if (!this.get("issueDate")) {
            this.set("issueDate", new Date().toISOString().substr(0, 10));
        }
    }.on("init"),

    initIsIssueDelivery: function () {
        this.set("isIssueDelivery", this.get("issueDate") === this.get("deliveryDate"));
    }.on("init"),

    initDueDays: function () {
        var issueDate = Date.parse(this.get("issueDate")),
            dueDate = Date.parse(this.get("dueDate"));

        if (!isNaN(issueDate) && !isNaN(dueDate)) {
            this.set("dueDays", (dueDate - issueDate) / (1000 * 60 * 60 * 24));
        }
    }.on("init"),

    isIssueDeliveryOrIssueDateDidChange: function () {
        if (this.get("isIssueDelivery")) {
            this.set("deliveryDate", this.get("issueDate"));
        }
    }.observes("isIssueDelivery", "issueDate"),

    dueDaysOrIssueDateDidChange: function () {
        var date,
            dueDays = this.get("dueDays"),
            issueDate = this.get("issueDate");

        date = Date.parse(issueDate) + 1000 * 60 * 60 * 24 * dueDays;

        if (!isNaN(date)) {
            this.set("dueDate", new Date(date).toISOString().substr(0, 10));
        }
    }.observes("dueDays", "issueDate"),

    addItem: function () {
        this.get("items").pushObject(ItemForm.create({ invoiceForm: this, model: Item.create({ quantity: 0, netPrice: 0 }) }));
    },

    validate: function () {
        return Ember.RSVP.Promise.all([this._super.apply(this, arguments)].concat(this.get("items").invoke("validate")));
    },

    currency: function () {
        var code = this.get("currencyCode");

        if (code) {
            return Currency.find(code);
        }
    }.property("currencyCode"),

    language: function () {
        var code = this.get("languageCode");

        if (code) {
            return Language.find(code);
        }
    }.property("languageCode")
});

export default InvoiceForm;
