import ItemForm from "faktura/forms/item";
import ExchangeRateMixin from "faktura/lib/exchange_rate_mixin";

var InvoicesNewController = Ember.ObjectController.extend(ExchangeRateMixin, {
    needs: ["application"],

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

    contentDidChange: function () {
        var periodNumber, lastNumber, invoices,
            properties = {},
            controller = this;

        if (this.get("settings.numerationTypeCode") === "year") {
            periodNumber = new Date().getFullYear().toString();
        }

        if (this.get("settings.numerationTypeCode") === "month") {
            periodNumber = (new Date().getMonth() + 1).toString() + "/" + new Date().getFullYear().toString();
        }

        lastNumber = this.get("invoices").filterBy("periodNumber", periodNumber).sortBy("periodicalNumber").get("lastObject.periodicalNumber") || 0;

        if (periodNumber) {
            properties.number = (lastNumber + 1) + "/" + periodNumber;
        }

        properties.seller = this.get("settings.seller");
        properties.sellerSignature = this.get("settings.contactName");

        this.setProperties(properties);

        // bindings somehow don't work without Ember.run.next
        Ember.run.next(function () {
            controller.get("content").addItem();
        });
    }.observes("content"),

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
