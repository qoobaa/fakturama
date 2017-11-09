import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ItemPropertiesMixin from 'fakturama/mixins/item-properties';
import FormMixin from 'fakturama/mixins/form';

const { ObjectProxy, computed: { oneWay } } = Ember

export default ObjectProxy.extend(EmberValidations, FormMixin, ItemPropertiesMixin, {
  validations: {
    description: {
      presence: { if: 'invoiceForm.isSubmitted' }
    },
    quantity: {
      presence: { if: 'invoiceForm.isSubmitted' },
      numericality: { if: 'invoiceForm.isSubmitted' }
    },
    netPrice: {
      presence: { if: 'invoiceForm.isSubmitted' },
      numericality: { if: 'invoiceForm.isSubmitted' }
    },
    unitCode: {
      presence: { if: 'invoiceForm.isSubmitted' }
    },
    taxRateCode: {
      presence: { if: 'invoiceForm.isSubmitted' }
    }
  },

  description: oneWay('model.description'),
  quantity: oneWay('model.quantity'),
  netPrice: oneWay('model.netPrice'),
  unitCode: oneWay('model.unitCode'),
  taxRateCode: oneWay('model.taxRateCode')
});
