import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  netAmount: computed("netPrice", "quantity", function () {
    return Math.round(this.get("netPrice") * this.get("quantity"));
  }),

  taxAmount: computed("netAmount", "taxRate.value", function () {
    return Math.round(this.get("netAmount") * this.get("taxRate.value") / 100);
  }),

  grossAmount: computed("netAmount", "taxAmount", function () {
    return this.get("netAmount") + this.get("taxAmount");
  }),

  unit: computed("unitCode", function () {
    const code = this.get("unitCode");
    if(code) {
      return this.get('store').queryRecord('unit', { code });
    }
  }),

  taxRate: computed("taxRateCode", function () {
    const code = this.get("taxRateCode");

    if(code) {
      return this.get('store').queryRecord('tax-rate', { code });
    }
  })
});
