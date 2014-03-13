import ItemForm from "faktura/forms/item";
import ExchangeRateMixin from "faktura/lib/exchange_rate_mixin";

var InvoicesNewController = Ember.ObjectController.extend(ExchangeRateMixin, {
    settings: null,
    currencies: null,
    taxRates: null,
    languages: null,
    units: null,
    clients: null,

    isRemoveItemDisabled: function () {
        return this.get("items.length") <= 1;
    }.property("items.@each"),

    modelDidChange: function () {
        this.get("model").addItem();
        this.set("seller", this.get("settings.seller"));
        this.set("sellerSignature", this.get("settings.contactName"));
    }.observes("model"),

    actions: {
        saveRecord: function () {
            var controller = this;

            this.set("isSubmitted", true);

            this.get("content").save().then(function () {
                controller.transitionToRoute("invoice.show", controller.get("model.model"));
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

export default InvoicesNewController;
