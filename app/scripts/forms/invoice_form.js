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
        },
        currency: {
            presence: { if: "isSubmitted" }
        },
        language: {
            presence: { if: "isSubmitted" }
        }
    },

    isSubmitted: false,
    isIssueDelivery: true,
    dueDays: 14,

    itemForms: Ember.computed.map("items", function (item) {
        return Faktura.ItemForm.create(Ember.merge({ invoiceForm: this }, item));
    }),

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

    netAmounts: Ember.computed.mapBy("itemForms", "netAmount"),
    totalNetAmount: Ember.computed.sum("netAmounts"),

    taxAmounts: Ember.computed.mapBy("itemForms", "taxAmount"),
    totalTaxAmount: Ember.computed.sum("taxAmounts"),

    grossAmounts: Ember.computed.mapBy("itemForms", "grossAmount"),
    totalGrossAmount: Ember.computed.sum("grossAmounts"),

    subTotals: function () {
        return this.get("itemForms").mapBy("formattedTaxRate").uniq().map(function (formattedTaxRate) {
            var itemForms,
                result = Ember.Object.create({ formattedTaxRate: formattedTaxRate });

            itemForms = this.get("itemForms").filterBy("formattedTaxRate", formattedTaxRate);

            result.netAmount = itemForms.reduce(function (previousValue, itemForm) {
                return previousValue + itemForm.get("netAmount");
            }, 0);

            result.taxAmount = itemForms.reduce(function (previousValue, itemForm) {
                return previousValue + itemForm.get("taxAmount");
            }, 0);

            result.grossAmount = itemForms.reduce(function (previousValue, itemForm) {
                return previousValue + itemForm.get("grossAmount");
            }, 0);

            return result;
        }.bind(this));
    }.property("itemForms", "itemForms.@each.netAmount", "itemForms.@each.taxAmount", "itemForms.@each.grossAmount", "itemForms.@each.formattedTaxRate"),

    validate: function () {
        return Ember.RSVP.Promise.all([this._super.apply(this, arguments)].concat(this.get("itemForms").invoke("validate")));
    },

    toModel: function () {
        return Ember.merge(this.getProperties(this.constructor.fields), { items: this.get("itemForms").invoke("toModel") });
    }
});

Faktura.InvoiceForm.reopenClass({
    fields: ["number", "issueDate", "deliveryDate", "dueDate", "seller", "buyer", "items", "comment", "currency", "language"],

    fromModel: function (model) {
        return this.create(model.getProperties(this.fields));
    }
});
