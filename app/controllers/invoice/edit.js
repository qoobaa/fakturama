import ItemForm from "faktura/forms/item";
import ExchangeRateMixin from "faktura/lib/exchange_rate_mixin";

var InvoiceEditController = Ember.ObjectController.extend(ExchangeRateMixin, {
    form: Ember.computed.alias("content"),

    settings: null,
    currencies: null,
    taxRates: null,
    languages: null,
    units: null,
    clients: null,

    isRemoveItemDisabled: function () {
        return this.get("items.length") <= 1;
    }.property("items.@each"),

    actions: {
        saveRecord: function () {
            var controller = this;

            this.set("isSubmitted", true);

            this.get("content").save().then(function () {
                controller.transitionToRoute("invoice.show", controller.get("form.model"));
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
        },

        chooseClient: function (client) {
            this.set("buyer", client.get("buyer"));
            this.set("buyerSignature", client.get("contactName"));
        }
    }
});

export default InvoiceEditController;
