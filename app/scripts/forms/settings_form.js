Faktura.SettingsForm = Ember.Object.extend(Ember.Validations.Mixin, {
    validations: {
        companyName: {
            presence: { if: "isSubmitted" }
        },
        address: {
            presence: { if: "isSubmitted" }
        },
        vatin: {
            presence: { if: "isSubmitted" }
        }
    },

    toModel: function () {
        return this.getProperties(this.constructor.fields);
    }
});

Faktura.SettingsForm.reopenClass({
    fields: ["companyName", "address", "vatin"],

    fromModel: function (model) {
        return this.create(model.getProperties(this.fields));
    }
});
