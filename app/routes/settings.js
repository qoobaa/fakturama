import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import SettingsForm from 'fakturama/forms/settings';

export default Route.extend({
  model: function() {
    const store = this.get('store');
    return RSVP.hash({
      model: store.findRecord('settings', 'default'),
      numerationTypes: store.findAll('numeration-type')
    });
  },

  setupController: function(controller, models) {
    models.model = SettingsForm.create({ model: models.model });
    models.isDeleteModalVisible = false;
    controller.setProperties(models);
  }
});
