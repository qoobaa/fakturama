Faktura.CurrentUserController = Ember.ObjectController.extend({
    isSignedIn: function () {
        return !!this.get("firebaseAuthToken");
    }.property("firebaseAuthToken")
});
