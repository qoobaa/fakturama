Faktura.InvoicesNewController = Ember.ObjectController.extend({
    isRemoveItemDisabled: function () {
        return this.get("form.itemForms.length") <= 1;
    }.property("form.itemForms.@each"),

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

        addItem: function () {
            this.get("form.itemForms").pushObject(Faktura.ItemForm.create({ invoiceForm: this.get("form") }));
        },

        removeItem: function (itemForm) {
            this.get("form.itemForms").removeObject(itemForm);
        }
    }
});
