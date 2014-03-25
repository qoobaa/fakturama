var SettingsForm = Ember.ObjectProxy.extend(Ember.Validations.Mixin, {
    model: Ember.computed.alias("content"),

    validations: {
        companyName: {
            presence: {
                if: "isSubmitted",
                message: "nie może być pusta"
            }
        },
        address: {
            presence: {
                if: "isSubmitted",
                message: "nie może być pusty"
            }
        },
        vatin: {
            presence: {
                if: "isSubmitted",
                message: "nie może być pusty"
            }
        },
        dueDays: {
            presence: {
                if: "isSubmitted",
                message: "nie może być pusty"
            },
            numericality: {
                if: "isSubmitted",
                greaterThanOrEqualTo: 0,
                messages: {
                    greaterThanOrEqualTo: "nie może być ujemny"
                }
            }
        }
    },

    id: Ember.computed.oneWay("model.id"),
    companyName: Ember.computed.oneWay("model.companyName"),
    address: Ember.computed.oneWay("model.address"),
    vatin: Ember.computed.oneWay("model.vatin"),
    dueDays: Ember.computed.oneWay("model.dueDays"),

    initDueDays: function () {
        if (this.get("dueDays") === undefined) {
            this.set("dueDays", 14);
        }
    }.on("init"),

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
