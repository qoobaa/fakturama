import FormMixin from "fakturama/mixins/form";

var SettingsForm = Ember.ObjectProxy.extend(Ember.Validations.Mixin, FormMixin, {
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
    }.on("init")
});

export default SettingsForm;
