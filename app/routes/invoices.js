import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model: function () {
    return this.get('store').findAll('invoice');
  }
});
