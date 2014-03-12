import ItemForm from "faktura/forms/item";

var InvoiceEditController = Ember.ObjectController.extend({
    needs: ["exchangeRate"],

    isRemoveItemDisabled: function () {
        return this.get("items.length") <= 1;
    }.property("items.@each"),

    issueDateDidChange: function () {
        this.set("controllers.exchangeRate.issueDate", this.get("issueDate"));
    }.observes("issueDate"),

    currencyCodeDidChange: function () {
        this.set("controllers.exchangeRate.currencyCode", this.get("currencyCode"));
    }.observes("currencyCode"),

    exchangeDateBinding: "controllers.exchangeRate.exchangeDate",
    exchangeDateDidChange: function () {
        this.set("model.exchangeDate", this.get("exchangeDate"));
    }.observes("exchangeDate"),
    exchangeRateBinding: "controllers.exchangeRate.exchangeRate",
    exchangeRateDidChange: function () {
        this.set("model.exchangeRate", this.get("exchangeRate"));
    }.observes("exchangeRate"),
    exchangeDivisorBinding: "controllers.exchangeRate.exchangeDivisor",
    exchangeDivisorrDidChange: function () {
        this.set("model.exchangeDivisor", this.get("exchangeDivisor"));
    }.observes("exchangeDivisor"),

    actions: {
        saveRecord: function () {
            var controller = this;

            this.set("isSubmitted", true);

            this.get("content").save().then(function () {
                controller.transitionToRoute("invoices");
            });
        },

        deleteRecord: function () {
            var controller = this,
                model = this.get("content.model");

            model.deleteRecord().then(function () {
                controller.transitionToRoute("invoices");
            });
        },

        addItem: function () {
            this.get("content").addItem();
        },

        removeItem: function (item) {
            this.get("items").removeObject(item);
        }
    }
});

export default InvoiceEditController;
