Faktura.InvoiceController = Ember.ObjectController.extend({
    isRemoveItemDisabled: function () {
        return this.get("items.length") <= 1;
    }.property("items.@each"),

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
            this.get("items").pushObject(Faktura.ItemForm.create({ invoiceForm: this.get("form"), model: Faktura.Item.create() }));
        },

        removeItem: function (item) {
            this.get("items").removeObject(item);
        }
    }
});
