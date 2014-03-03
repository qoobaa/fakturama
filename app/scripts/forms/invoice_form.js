Faktura.InvoiceForm = Ember.Object.extend(Ember.Validations.Mixin, {
    isIssueDelivery: true,

    validations: {
        number: {
            presence: { if: "isSubmitted" }
        },
        issueDate: {
            presence: { if: "isSubmitted" }
        },
        deliveryDate: {
            presence: { if: "isSubmitted" }
        }
    },

    toModel: function () {
        return this.getProperties(this.constructor.fields);
    }
});

Faktura.InvoiceForm.reopenClass({
    fields: ["number", "issueDate", "deliveryDate"],

    fromModel: function (model) {
        return this.create(model.getProperties(this.fields));
    }
});
