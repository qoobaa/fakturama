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
        return this.getProperties("name", "address", "vatin");
    }
});

Faktura.ClientForm.reopenClass({
    fromModel: function (model) {
        window.A = model;
        return this.create(model.getProperties("name", "address", "vatin"));
    }
});
