Faktura.InvoiceForm = Ember.Object.extend(Ember.Validations.Mixin, {
    validations: {
        number: {
            presence: { if: "isSubmitted" }
        }
    },

    toModel: function () {
        return this.getProperties(this.constructor.fields);
    }
});

Faktura.InvoiceForm.reopenClass({
    fields: ["number"],

    fromModel: function (model) {
        return this.create(model.getProperties(this.fields));
    }
});
