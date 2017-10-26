import Ember from 'ember';
import EmberValidations from 'ember-validations';
import FormMixin from 'fakturama/mixins/form';

const { ObjectProxy, computed: { oneWay } } = Ember;

export default ObjectProxy.extend(EmberValidations, FormMixin, {
  validations: {
    number: {
      presence: {
        if: 'isSubmitted',
        message: 'nie może być pusty'
      }
    }
  },

  id: oneWay('model.id'),
  bankName: oneWay('model.bankName'),
  swift: oneWay('model.swift'),
  number: oneWay('model.number'),
  description: oneWay('model.description')
});
