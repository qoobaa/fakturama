Faktura.InvoiceController = Ember.ObjectController.extend({
    isRemoveItemDisabled: function () {
        return this.get("form.items.length") <= 1;
    }.property("form.items.@each"),

    actions: {
        saveRecord: function () {
            var controller = this,
                form = this.get("form"),
                model = this.get("model");

            form.set("isSubmitted", true);

            form.validate().then(function () {
                model.setProperties(form.toModel());
                model.save().then(function () {
                    controller.transitionToRoute("invoices");
                });
            });
        },

        deleteRecord: function () {
            var controller = this,
                model = this.get("model");

            model.deleteRecord().then(function () {
                controller.transitionToRoute("invoices");
            });
        },

        addItem: function () {
            this.get("form.items").pushObject({});
        },

        removeItem: function (itemForm) {
            this.get("form.items").removeAt(this.get("form.itemForms").indexOf(itemForm));
        }
    }
});
