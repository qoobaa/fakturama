import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import InvoiceForm from "fakturama/forms/invoice";

export default Route.extend({
  model() {
    const store = this.get('store');

    return hash({
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
    controller.set('model', null);
    // let model = controller.get('model');
    // model.rollback();
  }
});
