import Unit from "faktura/models/unit";
import TaxRate from "faktura/models/tax_rate";

var ItemPresenter = Ember.ObjectProxy.extend({
    model: Ember.computed.alias("content"),

    netAmount: function (key, value) {
        return Math.round(this.get("netPrice") * this.get("quantity"));
    }.property("netPrice", "quantity"),

    taxRateValueBinding: "taxRate.value",

    taxAmount: function () {
        return Math.round(this.get("netAmount") * this.get("taxRate.value") / 100);
    }.property("netAmount", "taxRateValue"),

    grossAmount: function () {
        return this.get("netAmount") + this.get("taxAmount");
    }.property("netAmount", "taxAmount"),

    unit: function () {
        var code = this.get("unitCode");
        return code && Unit.find(code);
    }.property("unitCode"),

    taxRate: function () {
        var code = this.get("taxRateCode");
        return code && TaxRate.find(code);
    }.property("taxRateCode")
});

export default ItemPresenter;
