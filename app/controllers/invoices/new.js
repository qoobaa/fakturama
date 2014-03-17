import ItemForm from "faktura/forms/item";
import ExchangeRateMixin from "faktura/lib/exchange_rate_mixin";

var InvoicesNewController = Ember.ObjectController.extend(ExchangeRateMixin, {
    form: Ember.computed.alias("content"),

    settings: null,
    currencies: null,
    taxRates: null,
    languages: null,
    units: null,
    clients: null,
    invoices: null,
    accounts: null,

    isRemoveItemDisabled: function () {
        return this.get("items.length") <= 1;
    }.property("items.@each"),

    modelDidChange: function () {
        var periodNumber, lastNumber, invoices;

        if (this.get("settings.numerationTypeCode") === "year") {
            periodNumber = new Date().getFullYear().toString();
        }

        if (this.get("settings.numerationTypeCode") === "month") {
            periodNumber = (new Date().getMonth() + 1).toString() + "/" + new Date().getFullYear().toString();
        }

        lastNumber = this.get("invoices").filterBy("periodNumber", periodNumber).sortBy("periodicalNumber").get("lastObject.periodicalNumber") || 0;

        if (periodNumber) {
            this.set("model.number", (lastNumber + 1) + "/" + periodNumber);
        }

        this.get("model").addItem();
        this.set("seller", this.get("settings.seller"));
        this.set("sellerSignature", this.get("settings.contactName"));
    }.observes("model"),

    actions: {
        saveRecord: function () {
            var controller = this;

            this.set("isSubmitted", true);

            this.get("content").save().then(function () {
                controller.transitionToRoute("invoice.show", controller.get("form.model"));
            });
        },

        addItem: function () {
            this.get("content").addItem();
        },

        removeItem: function (item) {
            this.get("items").removeObject(item);
        },

        chooseClient: function (client) {
            this.setProperties({ buyer: client.get("buyer"), buyerSignature: client.get("contactName") });
        },

        chooseAccount: function (account) {
            this.setProperties({
                accountBankName: account.get("bankName"),
                accountSwift: account.get("swift"),
                accountNumber: account.get("number")
            });
        }
    }
});

export default InvoicesNewController;
