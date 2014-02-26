Faktura.Item = Ember.Object.extend({
    quantity: 0,

    englishUnit: function () {
        return Faktura.get("englishUnits." + Faktura.get("units").indexOf(this.get("unit")));
    }.property("unit"),

    netAmount: function (key, value) {
        return Math.round(this.get("netPrice") * this.get("quantity"));
    }.property("netPrice", "quantity"),

    taxRate: function () {
        var value = parseInt(this.get("formattedTaxRate"), 10);
        return isNaN(value) ? 0 : value;
    }.property("formattedTaxRate"),

    taxAmount: function () {
        return Math.round(this.get("netAmount") * this.get("taxRate") / 100);
    }.property("netAmount", "taxRate"),

    grossAmount: function () {
        return this.get("netAmount") + this.get("taxAmount");
    }.property("netAmount", "taxAmount"),

    toJSON: function () {
        return this.getProperties("description", "formattedQuantity", "unit", "formattedNetPrice", "formattedTaxRate");
    }
});
