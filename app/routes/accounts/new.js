import Route from '@ember/routing/route';
import AccountForm from 'fakturama/forms/account';

export default Route.extend({
  model: function() {
    return this.get('store').createRecord('account');
  },

  setupController(controller, model) {
    controller.set('model', AccountForm.create({ model: model }));
  },

  deactivate() {
    let controller = this.controllerFor(this.routeName);
    let model = controller.get('model');
    controller.set('model', null);
    model.delete();
  }
});
