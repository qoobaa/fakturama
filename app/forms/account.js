import ObjectProxy from '@ember/object/proxy';
import { oneWay } from '@ember/object/computed';
import EmberValidations from 'ember-validations';
import FormMixin from 'fakturama/mixins/form';

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
