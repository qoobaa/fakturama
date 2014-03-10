import ItemPresenter from "faktura/presenters/item";

var InvoicePresenter = Ember.ObjectProxy.extend({
    model: Ember.computed.alias("content"),

    items: Ember.computed.map("model.items", function (item) {
        return ItemPresenter.create({ model: item });
    }),

    netAmounts: Ember.computed.mapBy("items", "netAmount"),
    totalNetAmount: Ember.computed.sum("netAmounts"),

    taxAmounts: Ember.computed.mapBy("items", "taxAmount"),
    totalTaxAmount: Ember.computed.sum("taxAmounts"),

    grossAmounts: Ember.computed.mapBy("items", "grossAmount"),
    totalGrossAmount: Ember.computed.sum("grossAmounts"),

    subTotals: function () {
        return this.get("items").mapBy("formattedTaxRate").uniq().map(function (formattedTaxRate) {
            var items,
                result = Ember.Object.create({ formattedTaxRate: formattedTaxRate });

            items = this.get("items").filterBy("formattedTaxRate", formattedTaxRate);

            result.netAmount = items.reduce(function (previousValue, item) {
                return previousValue + item.get("netAmount");
            }, 0);

            result.taxAmount = items.reduce(function (previousValue, item) {
                return previousValue + item.get("taxAmount");
            }, 0);

            result.grossAmount = items.reduce(function (previousValue, item) {
                return previousValue + item.get("grossAmount");
            }, 0);

            return result;
        }.bind(this));
    }.property("items", "items.@each.netAmount", "items.@each.taxAmount", "items.@each.grossAmount", "items.@each.formattedTaxRate"),
});

export default InvoicePresenter;
