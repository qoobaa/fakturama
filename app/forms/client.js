import Ember from 'ember';
import EmberValidations from 'ember-validations';
import FormMixin from 'fakturama/mixins/form';

const { ObjectProxy, computed: { oneWay } } = Ember;

export default ObjectProxy.extend(EmberValidations, FormMixin, {
  validations: {
    companyName: {
      presence: {
        if: 'isSubmitted',
        message: 'nie może być pusta'
      }
    },
    address: {
      presence: {
        if: 'isSubmitted',
        message: 'nie może być pusty'
      }
    }
  },

  id: oneWay('model.id'),
  companyName: oneWay('model.companyName'),
  address: oneWay('model.address'),
  vatin: oneWay('model.vatin')
});
