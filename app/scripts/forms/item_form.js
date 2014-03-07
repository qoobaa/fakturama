Faktura.ItemForm = Ember.Object.extend(Ember.Validations.Mixin, {
    validations: {
        description: {
            presence: { if: "invoiceForm.isSubmitted" }
        },
        quantity: {
            presence: { if: "invoiceForm.isSubmitted" },
            numericality: { if: "invoiceForm.isSubmitted" }
        },
        netPrice: {
            presence: { if: "invoiceForm.isSubmitted" },
            numericality: { if: "invoiceForm.isSubmitted" }
        },
        unit: {
            presence: { if: "invoiceForm.isSubmitted" }
        },
        formattedTaxRate: {
            presence: { if: "invoiceForm.isSubmitted" }
        }
    },

    description: Ember.computed.oneWay("model.description"),
    quantity: Ember.computed.oneWay("model.quantity"),
    netPrice: Ember.computed.oneWay("model.netPrice"),
    unit: Ember.computed.oneWay("model.unit"),
    formattedTaxRate: Ember.computed.oneWay("model.formattedTaxRate"),

    netAmount: function (key, value) {
        return Math.round(this.get("netPrice") * this.get("quantity"));
    }.property("netPrice", "quantity"),

    taxRate: function () {
        var value = parseInt(this.get("formattedTaxRate"), 10);
        return isNaN(value) ? 0 : value;
    }.property("formattedTaxRate"),

    taxAmount: function () {
        return Math.round(this.get("netAmount") * this.get("taxRate") / 100);
    }.property("netAmount", "taxRate"),

    grossAmount: function () {
        return this.get("netAmount") + this.get("taxAmount");
    }.property("netAmount", "taxAmount")
});
