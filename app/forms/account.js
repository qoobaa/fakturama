import FormMixin from "fakturama/mixins/form";

var AccountForm = Ember.ObjectProxy.extend(Ember.Validations.Mixin, FormMixin, {
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
    description: Ember.computed.oneWay("model.description")
});

export default AccountForm;
