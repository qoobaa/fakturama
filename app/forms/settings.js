var SettingsForm = Ember.ObjectProxy.extend(Ember.Validations.Mixin, {
    model: Ember.computed.alias("content"),

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

    id: Ember.computed.oneWay("model.id"),
    companyName: Ember.computed.oneWay("model.companyName"),
    address: Ember.computed.oneWay("model.address"),
    vatin: Ember.computed.oneWay("model.vatin"),

    save: function () {
        var form = this,
            model = this.get("model");

        return this.validate().then(function () {
            model.setProperties(form.toJSON());
            return model.save();
        });
    },

    toJSON: function () {
        return this.getProperties(this.get("model").constructor.getAttributes());
    }
});

export default SettingsForm;
