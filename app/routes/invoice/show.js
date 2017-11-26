import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return this.modelFor('invoice');
  },
  activate() {
    const invoice = this.modelFor('invoice');
    document.title = `${invoice.get('number')} ${invoice.get('buyerFirstLine')} - Fakturama`;
  },
  deactivate() {
    document.title = 'Fakturama';
  }
});
