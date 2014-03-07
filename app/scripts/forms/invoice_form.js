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

    id: Ember.computed.oneWay("model.id"),
    number: Ember.computed.oneWay("model.number"),
    issueDate: Ember.computed.oneWay("model.issueDate"),
    deliveryDate: Ember.computed.oneWay("model.deliveryDate"),
    seller: Ember.computed.oneWay("model.seller"),
    buyer: Ember.computed.oneWay("model.buyer"),
    currency: Ember.computed.oneWay("model.currency"),
    language: Ember.computed.oneWay("model.language"),
    items: Ember.computed.map("model.items", function (item) {
        return Faktura.ItemForm.create({ model: item, invoiceForm: this });
    }),

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

    netAmounts: Ember.computed.mapBy("items", "netAmount"),
    totalNetAmount: Ember.computed.sum("netAmounts"),

    taxAmounts: Ember.computed.mapBy("items", "taxAmount"),
    totalTaxAmount: Ember.computed.sum("taxAmounts"),

    grossAmounts: Ember.computed.mapBy("items", "grossAmount"),
    totalGrossAmount: Ember.computed.sum("grossAmounts"),

    subTotals: function () {
        return this.get("items").mapBy("formattedTaxRate").uniq().map(function (formattedTaxRate) {
            var items,
                result = Ember.Object.create({ formattedTaxRate: formattedTaxRate });

            items = this.get("items").filterBy("formattedTaxRate", formattedTaxRate);

            result.netAmount = items.reduce(function (previousValue, item) {
                return previousValue + item.get("netAmount");
            }, 0);

            result.taxAmount = items.reduce(function (previousValue, item) {
                return previousValue + item.get("taxAmount");
            }, 0);

            result.grossAmount = items.reduce(function (previousValue, item) {
                return previousValue + item.get("grossAmount");
            }, 0);

            return result;
        }.bind(this));
    }.property("items", "items.@each.netAmount", "items.@each.taxAmount", "items.@each.grossAmount", "items.@each.formattedTaxRate"),

    validate: function () {
        return Ember.RSVP.Promise.all([this._super.apply(this, arguments)].concat(this.get("items").invoke("validate")));
    },

    save: function () {
        var form = this,
            model = this.get("model");

        return this.validate().then(function () {
            model.setProperties(form.toJSON());
            model.get("items").clear();
            form.get("items").forEach(function (item) {
                item.get("model").setProperties(item.toJSON());
                model.get("items").pushObject(item.get("model"));
            });
            // model.set("items.content", form.get("items").mapBy("model"));
            return model.save();
        });
    },

    toJSON: function () {
        return this.getProperties(this.get("model").constructor.getAttributes());
    }
});
