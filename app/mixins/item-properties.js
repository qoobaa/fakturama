import Ember from 'ember';
import Unit from "fakturama/models/unit";
import TaxRate from "fakturama/models/tax-rate";

const { Mixin, computed } = Ember;

export default Mixin.create({
  netAmount: computed("netPrice", "quantity", function () {
    return Math.round(this.get("netPrice") * this.get("quantity"));
  }),

  taxRateValueBinding: "taxRate.value",

  taxAmount: computed("netAmount", "taxRateValue", function () {
    return Math.round(this.get("netAmount") * this.get("taxRate.value") / 100);
  }),

  grossAmount: computed("netAmount", "taxAmount", function () {
    return this.get("netAmount") + this.get("taxAmount");
  }),

  unit: computed("unitCode", function () {
    const code = this.get("unitCode");
    return code && Unit.find(code);
  }),

  taxRate: computed("taxRateCode", function () {
    const code = this.get("taxRateCode");
    return code && TaxRate.find(code);
  })
});
