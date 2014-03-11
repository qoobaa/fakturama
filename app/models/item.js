import Unit from "faktura/models/unit";
import TaxRate from "faktura/models/tax_rate";

var Item = Ember.Model.extend({
    description: Ember.attr(),
    quantity: Ember.attr(),
    netPrice: Ember.attr(),
    unitCode: Ember.attr(),
    unit: function() {
        var code = this.get("unitCode");
        return code && Unit.find(code);
    }.property("unitCode"),
    taxRateCode: Ember.attr(),
    taxRate: function() {
        var code = this.get("taxRateCode");
        return code && TaxRate.find(code);
    }.property("taxRateCode"),
});

export default Item;
