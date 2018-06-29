import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';
import ItemPropertiesMixin from 'fakturama/mixins/item-properties';

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

export default EmberObject.extend(ItemPropertiesMixin, {
  store: service('store'),
  toJSON() {
    return this.getProperties(attributes);
  }
});
