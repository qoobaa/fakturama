import ItemForm from "fakturama/forms/item";
import ExchangeRateMixin from "fakturama/mixins/exchange-rate";

var InvoiceEditController = Ember.ObjectController.extend(ExchangeRateMixin, {
    needs: ["application"],

    form: Ember.computed.alias("content"),

    settings: null,
    currencies: null,
    taxRates: null,
    languages: null,
    units: null,
    clients: null,
    accounts: null,

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

export default InvoiceEditController;
