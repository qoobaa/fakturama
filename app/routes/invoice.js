import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(params) {
    return this.get('store').findRecord('invoice', params.invoice_id);
  }
});
