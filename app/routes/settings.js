import Ember from 'ember';
import SettingsForm from 'fakturama/forms/settings';

const { Route, RSVP } = Ember;

export default Route.extend({
  model: function () {
    const store = this.get('store');
    return RSVP.hash({
      model: store.findRecord('settings', 'default'),
      numerationTypes: store.findAll('numeration-type')
    });
  },

  setupController: function (controller, models) {
    models.model = SettingsForm.create({ model: models.model });
    models.isDeleteModalVisible = false;
    controller.setProperties(models);
  }
});
