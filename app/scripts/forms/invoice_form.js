Faktura.InvoiceForm = Ember.Object.extend(Ember.Validations.Mixin, {
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
        }
    },

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

    validate: function () {
        return Ember.RSVP.Promise.all([this._super.apply(this, arguments)].concat(this.get("items").invoke("validate")));
    },

    toModel: function () {
        var properties = this.getProperties(this.constructor.fields);

        properties.items = properties.items.invoke("toModel");

        return properties;
    }
});

Faktura.InvoiceForm.reopenClass({
    fields: ["number", "issueDate", "deliveryDate", "dueDate", "seller", "buyer", "items"],

    fromModel: function (model) {
        var invoiceForm = this.create(),
            items = model.get("items");

        if (!items || !items.length) {
            items = [{}];
        }

        items = items.map(function (item) {
            return Faktura.ItemForm.create(Ember.merge({ invoiceForm: invoiceForm }, item));
        });

        invoiceForm.setProperties(model.getProperties(this.fields));
        invoiceForm.set("items", items);

        return invoiceForm;
    }
});
