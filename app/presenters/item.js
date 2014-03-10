var ItemPresenter = Ember.ObjectProxy.extend({
    model: Ember.computed.alias("content"),

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
    }.property("netAmount", "taxAmount")
});

export default ItemPresenter;
