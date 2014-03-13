import ClientPresenter from "faktura/presenters/client";

var ClientForm = ClientPresenter.extend(Ember.Validations.Mixin, {
    validations: {
        companyName: {
            presence: { if: "isSubmitted" }
        },
        address: {
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

export default ClientForm;
