import Settings from "faktura/models/settings";
import SettingsForm from "faktura/forms/settings";
import NumerationType from "faktura/models/numeration_type";

var SettingsRoute = Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            model: Settings.fetch(),
            numerationTypes: NumerationType.fetch()
        });
    },

    setupController: function (controller, models) {
        models.model = SettingsForm.create({ model: models.model });
        controller.setProperties(models);
    }
});

export default SettingsRoute;
