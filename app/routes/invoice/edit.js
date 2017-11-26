import Ember from 'ember';
import InvoiceForm from "fakturama/forms/invoice";

const { Route } = Ember;

export default Route.extend({
  model() {
    const store = this.get('store');

    return Ember.RSVP.hash({
      model: this.modelFor("invoice"),
      currencies: store.findAll('currency'),
      taxRates: store.findAll('tax-rate'),
      languages: store.findAll('language'),
      units: store.findAll('unit'),
      clients: store.findAll('client'),
      accounts: store.findAll('account')
    });
  },

  setupController(controller, models) {
    models.model = InvoiceForm.create({ model: models.model });
    controller.setProperties(models);
  },

  deactivate() {
    let controller = this.controllerFor(this.routeName);
    let model = controller.get('model');
    controller.set('model', null);
    model.rollback();
  }
});
