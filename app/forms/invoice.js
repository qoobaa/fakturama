import InvoicePropertiesMixin from "faktura/lib/invoice_properties_mixin";
import Item from "faktura/models/item";
import ItemForm from "faktura/forms/item";
import Currency from "faktura/models/currency";
import Language from "faktura/models/language";

var InvoiceForm = Ember.ObjectProxy.extend(Ember.Validations.Mixin, InvoicePropertiesMixin, {
    model: Ember.computed.alias("content"),

    validations: {
        number: {
            presence: { if: "isSubmitted" }
        },
        issueDate: {
            presence: { if: "isSubmitted" }
        },
        deliveryDate: {
            presence: { if: "isSubmitted" }
        },
        dueDays: {
            presence: { if: "isSubmitted" },
            numericality: { if: "isSubmitted", greaterThanOrEqualTo: 0 }
        },
        seller: {
            presence: { if: "isSubmitted" }
        },
        buyer: {
            presence: { if: "isSubmitted" }
        },
        currencyCode: {
            presence: { if: "isSubmitted" }
        },
        languageCode: {
            presence: { if: "isSubmitted" }
        },
        exchangeDate: {
            presence: {
                if: function (invoice) {
                    return invoice.get("isSubmitted") && invoice.get("isExchanging");
                }
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

    save: function () {
        var form = this,
            model = this.get("model");

        return this.validate().then(function () {
            model.setProperties(form.toJSON());
            return model.save();
        });
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
    }.property("languageCode"),

    toJSON: function () {
        return this.getProperties(this.get("model").constructor.getAttributes());
    }
});

export default InvoiceForm;
