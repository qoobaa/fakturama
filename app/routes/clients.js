import Ember from "ember";

const { Route } = Ember;

export default Route.extend({
  templateName: 'app',
  model: function () {
    return this.store.findAll('client');
  }
});
