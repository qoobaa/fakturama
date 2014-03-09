import Settings from "faktura/models/settings";
import SettingsForm from "faktura/forms/settings";

var SettingsRoute = Ember.Route.extend({
    model: function () {
        return Settings.fetch();
    },

    setupController: function (controller, model) {
        controller.set("model", SettingsForm.create({ model: model }));
    }
});

export default SettingsRoute;
