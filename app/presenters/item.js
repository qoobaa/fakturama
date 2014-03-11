var ItemPresenter = Ember.ObjectProxy.extend({
    model: Ember.computed.alias("content"),

    netAmount: function (key, value) {
        return Math.round(this.get("netPrice") * this.get("quantity"));
    }.property("netPrice", "quantity"),

    taxAmount: function () {
        return Math.round(this.get("netAmount") * this.get("taxRate.value") / 100);
    }.property("netAmount", "taxRate.value"),

    grossAmount: function () {
        return this.get("netAmount") + this.get("taxAmount");
    }.property("netAmount", "taxAmount")
});

export default ItemPresenter;
