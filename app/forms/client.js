import FormMixin from "fakturama/mixins/form";

var ClientForm = Ember.ObjectProxy.extend(Ember.Validations.Mixin, FormMixin, {
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
        }
    },

    id: Ember.computed.oneWay("model.id"),
    companyName: Ember.computed.oneWay("model.companyName"),
    address: Ember.computed.oneWay("model.address"),
    vatin: Ember.computed.oneWay("model.vatin")
});

export default ClientForm;
