var AccountsNewController = Ember.ObjectController.extend({
    actions: {
        saveRecord: function () {
            var controller = this;

            this.set("isSubmitted", true);

            this.get("content").save().then(function () {
                controller.transitionToRoute("accounts");
            });
        }
    }
});

export default AccountsNewController;
