Faktura.SettingsForm = Ember.Object.extend(Ember.Validations.Mixin, {
    validations: {
        name: {
            presence: { if: "isSubmitted" }
        }
    },

    toModel: function () {
        return this.getProperties(this.constructor.fields);
    }
});

Faktura.SettingsForm.reopenClass({
    fields: ["name", "address", "vatin"],

    fromModel: function (model) {
        return this.create(model.getProperties(this.fields));
    }
});
