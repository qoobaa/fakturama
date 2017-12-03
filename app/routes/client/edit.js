import Route from '@ember/routing/route';
import ClientForm from 'fakturama/forms/client';

export default Route.extend({
  model: function () {
    return this.modelFor('client');
  },

  setupController(controller, model) {
    controller.set('model', ClientForm.create({ model: model }));
  }
});
