Faktura.Item = Ember.Object.extend({
    description: "",

    formattedQuantity: "",

    quantity: function () {
        return this.get("formattedQuantity").integerize(3);
    }.property("formattedQuantity"),

    unit: undefined,

    englishUnit: function () {
        return Faktura.get("englishUnits." + Faktura.get("units").indexOf(this.get("unit")));
    }.property("unit"),

    formattedNetPrice: "",

    netPrice: function () {
        return this.get("formattedNetPrice").integerize(2);
    }.property("formattedNetPrice"),

    formattedGrossPrice: "",

    grossPrice: function () {
        return this.get("formattedGrossPrice").integerize(2);
    }.property("formattedGrossPrice"),

    netAmount: function (key, value) {
        return Math.round(this.get("netPrice") * this.get("quantity") / 1000);
    }.property("netPrice", "quantity"),

    formattedNetAmount: function () {
        return String(this.get("netAmount")).monetize();
    }.property("netAmount"),

    formattedTaxRate: undefined,

    formattedTaxRateDidChange: function () {
        var value = parseInt(this.get("formattedTaxRate"), 10);
        this.set("taxRate", isNaN(value) ? 0 : value);
    }.observes("formattedTaxRate"),

    englishFormattedTaxRate: function () {
        return Faktura.get("englishTaxRates." + Faktura.get("taxRates").indexOf(this.get("formattedTaxRate")));
    }.property("formattedTaxRate"),

    formattedTaxAmount: "",

    taxAmount: function () {
        return Math.round(this.get("netAmount") * this.get("taxRate") / 100);
    }.property("netAmount", "taxRate"),

    formattedTaxAmount: function () {
        return String(this.get("taxAmount")).monetize();
    }.property("taxAmount"),

    grossAmount: function () {
        return this.get("netAmount") + this.get("taxAmount");
    }.property("netAmount", "taxAmount"),

    formattedGrossAmount: function () {
        return String(this.get("grossAmount")).monetize();
    }.property("grossAmount")
});
