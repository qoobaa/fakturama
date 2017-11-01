import Ember from 'ember';
import EmberValidations from 'ember-validations';
import FormMixin from 'fakturama/mixins/form';

const { ObjectProxy, computed: { oneWay } } = Ember;

export default ObjectProxy.extend(EmberValidations, FormMixin, {
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

  id: oneWay("model.id"),
  companyName: oneWay("model.companyName"),
  address: oneWay("model.address"),
  vatin: oneWay("model.vatin"),
  dueDays: oneWay("model.dueDays"),

  initDueDays: function () {
    if (this.get("dueDays") === undefined) {
      this.set("dueDays", 14);
    }
  }.on("init")
});
