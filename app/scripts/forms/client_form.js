Faktura.ClientForm = Ember.Object.extend(Ember.Validations.Mixin, {
    validations: {
        name: {
            presence: { if: "isSubmitted" }
        },
        address: {
            presence: { if: "isSubmitted" }
        }
    },

    modelDidChange: function () {
        this.setProperties(this.get("model").toJSON());
    }.observes("model").on("init"),

    save: function () {
        var form = this,
            model = this.get("model");

        return this.validate().then(function () {
            model.setProperties(form.getProperties(model.constructor.getAttributes()));
            return model.save();
        });
    }
});
