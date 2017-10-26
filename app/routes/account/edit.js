import AccountForm from 'fakturama/forms/account';
import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model: function () {
    return this.modelFor('account');
  },

  setupController(controller, model) {
    controller.set('model', AccountForm.create({ model: model }));
  }
});
