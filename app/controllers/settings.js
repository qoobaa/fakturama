var SettingsController = Ember.ObjectController.extend({
    needs: ["application"],

    numerationTypes: null,
    isDeleteModalVisible: false,

    contentDidChange: function () {

    }.observes("content"),

    actions: {
        save: function () {
            var controller = this;

            this.set("isSubmitted", true);

            this.get("content").save().then(function () {
                controller.transitionToRoute("index");
            });
        },

        showDeleteModal: function () {
            this.set("isDeleteModalVisible", true);
        },

        dismissDeleteModal: function () {
            this.set("isDeleteModalVisible", false);
        }
    }
});

export default SettingsController;
