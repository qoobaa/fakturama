import AccountForm from 'fakturama/forms/account';
import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model: function () {
    return this.get('store').createRecord('account');
  },

  setupController(controller, model) {
    controller.set('model', AccountForm.create({ model: model }));
  },

  deactivate() {
    let controller = this.controllerFor(this.routeName);
    let model = controller.get('model');
    controller.set('model', null);
    model.rollback();
  }
});
