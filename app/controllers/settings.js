var SettingsController = Ember.ObjectController.extend({
    numerationTypes: null,

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
