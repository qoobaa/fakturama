import Route from '@ember/routing/route';
import ClientForm from 'fakturama/forms/client';

export default Route.extend({
  model() {
    return this.get('store').createRecord('client');
  },

  setupController(controller, model) {
    controller.set('model', ClientForm.create({ model: model }));
  },

  deactivate() {
    let controller = this.controllerFor(this.routeName);
    let model = controller.get('model');
    controller.set('model', null);
    model.rollback();
  }
});
