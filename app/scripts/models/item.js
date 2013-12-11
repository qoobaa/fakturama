Faktura.Item = Ember.Object.extend({
    description: "",

    formattedQuantity: "",

    quantity: function () {
        return this.get("formattedQuantity").integerize(3);
    }.property("formattedQuantity"),

    unit: undefined,

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

    formattedTaxRate: undefined,

    formattedTaxRateDidChange: function () {
        var value = parseInt(this.get("formattedTaxRate"), 10);
        this.set("taxRate", isNaN(value) ? 0 : value);
    }.observes("formattedTaxRate"),

    formattedTaxAmount: "",

    taxAmount: function () {
        return Math.round(this.get("netAmount") * this.get("taxRate") / 100);
    }.property("netAmount", "taxRate"),

    grossAmount: function () {
        return this.get("netAmount") + this.get("taxAmount");
    }.property("netAmount", "taxAmount")
});
