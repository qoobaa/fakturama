import Ember from 'ember';
import EmberValidations from 'ember-validations';
import FormMixin from 'fakturama/mixins/form';

const { ObjectProxy } = Ember;

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
    }
  },

  id: Ember.computed.oneWay("model.id"),
  companyName: Ember.computed.oneWay("model.companyName"),
  address: Ember.computed.oneWay("model.address"),
  vatin: Ember.computed.oneWay("model.vatin")
});
