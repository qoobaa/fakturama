import Ember from 'ember';
import ItemPropertiesMixin from "fakturama/mixins/item-properties";

const { inject: { service } } = Ember;

const attributes = [
  'description',
  'quantity',
  'unitCode',
  'netPrice',
  'netAmount',
  'taxRateCode',
  'taxAmount',
  'grossAmount'
];

export default Ember.Object.extend(ItemPropertiesMixin, {
  store: service('store'),
  toJSON() {
    return this.getProperties(attributes);
  }
});
