Faktura.Item = Ember.Object.extend({
    description: "Programowanie w języku Ruby / JavaScript",

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

    formattedNetAmount: function () {
        return this.get("netAmount");
    }.property("netAmount"),

    netAmount: function (key, value) {
        return this.get("netPrice") * this.get("quantity") / 1000;
    }.property("netPrice", "quantity"),

    formattedTaxRate: "",

    taxRate: function () {
        var value = parseInt(this.get("taxRate"), 10);
        return isNaN(value) ? 0 : value;
    }.property("formattedTaxRate"),

    formattedTaxAmount: "0",

    taxAmount: function () {
        return Math.round(this.get("netAmount") * this.get("taxRateValue") / 100);
    }.property("netAmount", "taxRateValue"),

    grossAmount: 1100
});
