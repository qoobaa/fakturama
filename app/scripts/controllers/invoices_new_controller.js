Faktura.InvoicesNewController = Ember.ObjectController.extend({
    actions: {
        save: function () {
            var controller = this,
                form = this.get("form"),
                model = this.get("model");

            form.set("isSubmitted", true);
            Ember.run.sync();
            form.validate().then(function () {
                model.setProperties(form.toModel());
                model.save().then(function () {
                    controller.transitionToRoute("invoices");
                });
            });
        },
        addItem: function () {
            var form = this.get("form");

            form.get("items").pushObject(Faktura.ItemForm.create({ invoiceForm: form }));
        },
        removeItem: function (item) {
            if (this.get("form.items.length") > 1) {
                this.get("form.items").removeObject(item);
            }
        }
    }
});
