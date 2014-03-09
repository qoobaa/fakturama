var SettingsController = Ember.ObjectController.extend({
    actions: {
        save: function () {
            var controller = this;

            this.set("isSubmitted", true);

            this.get("content").save().then(function () {
                controller.transitionToRoute("index");
            });
        }
    }
});

export default SettingsController;
