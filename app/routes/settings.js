import Settings from "fakturama/models/settings";
import SettingsForm from "fakturama/forms/settings";
import NumerationType from "fakturama/models/numeration_type";

var SettingsRoute = Ember.Route.extend({
    model: function () {
        return Ember.RSVP.hash({
            model: Settings.fetch(),
            numerationTypes: NumerationType.fetch()
        });
    },

    setupController: function (controller, models) {
        models.model = SettingsForm.create({ model: models.model });
        models.isDeleteModalVisible = false;
        controller.setProperties(models);
    }
});

export default SettingsRoute;
