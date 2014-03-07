Faktura.ClientController = Ember.ObjectController.extend({
    actions: {
        saveRecord: function () {
            var controller = this;

            this.set("isSubmitted", true);

            this.get("content").save().then(function () {
                controller.transitionToRoute("clients");
            });
        },

        deleteRecord: function () {
            var controller = this,
                model = this.get("content.model");

            model.deleteRecord().then(function () {
                controller.transitionToRoute("clients");
            });
        }
    }
});
