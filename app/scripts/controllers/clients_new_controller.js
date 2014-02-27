Faktura.ClientsNewController = Ember.ObjectController.extend({
    actions: {
        save: function () {
            this.get("model").save();
            this.transitionToRoute("clients");
        }
    }
});
