Faktura.InvoiceController = Ember.ObjectController.extend({
    form: function () {
        return Faktura.InvoiceForm.fromModel(this.get("model"));
    }.property("model"),

    actions: {
        save: function () {
            var controller = this,
                form = this.get("form"),
                model = this.get("model");

            form.set("isSubmitted", true).validate().then(function () {
                model.setProperties(form.toModel());
                model.save().then(function () {
                    controller.transitionToRoute("invoices");
                });
            });
        },
        destroy: function () {
            var controller = this,
                model = this.get("model");

            model.deleteRecord().then(function () {
                controller.transitionToRoute("invoices");
            });
        }
    }
});
