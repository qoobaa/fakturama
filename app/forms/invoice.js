import InvoicePresenter from "faktura/presenters/invoice";
import ItemPresenter from "faktura/presenters/item";
import ItemForm from "faktura/forms/item";
import Currency from "faktura/models/currency";

var InvoiceForm = InvoicePresenter.extend(Ember.Validations.Mixin, {
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
        currency: {
            presence: { if: "isSubmitted" }
        },
        language: {
            presence: { if: "isSubmitted" }
        }
    },

    id: Ember.computed.oneWay("model.id"),
    number: Ember.computed.oneWay("model.number"),
    issueDate: Ember.computed.oneWay("model.issueDate"),
    deliveryDate: Ember.computed.oneWay("model.deliveryDate"),
    seller: Ember.computed.oneWay("model.seller"),
    buyer: Ember.computed.oneWay("model.buyer"),
    currency: Ember.computed.oneWay("model.currency.code"),
    language: Ember.computed.oneWay("model.language"),
    items: Ember.computed.map("model.items", function (item) {
        return ItemForm.create({ model: item, invoiceForm: this });
    }),
    comment: Ember.computed.oneWay("model.comment"),
    sellerSignature: Ember.computed.oneWay("model.sellerSignature"),
    buyerSignature: Ember.computed.oneWay("model.buyerSignature"),

    isSubmitted: false,
    isIssueDelivery: true,
    dueDays: 14,

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

    addItem: function (item) {
        if (!item) {
            item = {};
        }

        this.get("items").pushObject(ItemForm.create({ invoiceForm: this, model: ItemPresenter.create({model: item}) }));
    },

    modelDidChange: function () {
        if (this.get("items.length") === 0) {
            this.addItem();
        }
    }.observes("model").on("init"),

    validate: function () {
        return Ember.RSVP.Promise.all([this._super.apply(this, arguments)].concat(this.get("items").invoke("validate")));
    },

    save: function () {
        var form = this,
            model = this.get("model");

        return this.validate().then(function () {
            model.setProperties(form.toJSON());
            model.set("currency", Currency.find(form.get("currency")));
            model.set("items", form.get("items").invoke("toJSON"));
            return model.save();
        });
    },

    toJSON: function () {
        return this.getProperties(this.get("model").constructor.getAttributes());
    }
});

export default InvoiceForm;
