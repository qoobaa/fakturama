import Ember from 'ember';
import SettingsForm from 'fakturama/forms/settings';

const { Route, RSVP } = Ember;

export default Route.extend({
  model: function () {
    return RSVP.hash({
      model: this.get('store').findRecord('settings', 'default'),
      numerationTypes: this.get('store').findAll('numeration-type')
    });
  },

  setupController: function (controller, models) {
    models.model = SettingsForm.create({ model: models.model });
    models.isDeleteModalVisible = false;
    controller.setProperties(models);
  }
});
