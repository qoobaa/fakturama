Faktura.ClientForm = Ember.Object.extend(Ember.Validations.Mixin, {
    validations: {
        name: {
            presence: { if: "isSubmitted" }
        },
        address: {
            presence: { if: "isSubmitted" }
        }
    },

    toModel: function () {
        return this.getProperties(this.constructor.fields);
    }
});

Faktura.ClientForm.reopenClass({
    fields: ["name", "address", "vatin"],

    fromModel: function (model) {
        return this.create(Ember.copy(model.getProperties(this.fields)));
    }
});
