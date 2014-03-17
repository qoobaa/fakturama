var AccountForm = Ember.ObjectProxy.extend(Ember.Validations.Mixin, {
    model: Ember.computed.alias("content"),

    validations: {
        number: {
            presence: {
                if: "isSubmitted",
                message: "nie może być pusty"
            }
        }
    },

    id: Ember.computed.oneWay("model.id"),
    bankName: Ember.computed.oneWay("model.bankName"),
    swift: Ember.computed.oneWay("model.swift"),
    number: Ember.computed.oneWay("model.number"),
    description: Ember.computed.oneWay("model.description"),

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

export default AccountForm;
