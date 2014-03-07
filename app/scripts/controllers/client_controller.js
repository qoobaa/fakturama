Faktura.ClientController = Ember.ObjectController.extend({
    actions: {
        saveRecord: function () {
            var controller = this,
                form = this.get("form"),
                model = this.get("model");

            form.set("isSubmitted", true).validate().then(function () {
                model.setProperties(form.toModel());
                model.save().then(function () {
                    controller.transitionToRoute("clients");
                });
            });
        },

        deleteRecord: function () {
            var controller = this,
                model = this.get("model");

            model.deleteRecord().then(function () {
                controller.transitionToRoute("clients");
            });
        }
    }
});
