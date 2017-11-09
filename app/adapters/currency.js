import Ember from 'ember';
import FixtureAdapter from 'ember-data-fixture-adapter';

const { Inflector, isEqual } = Ember;
const inflector = new Inflector(Inflector.defaultRules);

export default FixtureAdapter.extend({
  findRecord(store, model, id) {
    return this.find(store, model, id);
  },

  queryRecord(store, model, query) {
    return this.findQuery(store, model, query);
  },

  queryFixtures(fixtures, query) {
    return fixtures.find(function(record) {
      const compareTo = Object.assign({}, record, query);
      return JSON.stringify(record) === JSON.stringify(compareTo);
    });
  }
});
