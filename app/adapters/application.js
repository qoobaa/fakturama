import config from "fakturama/config/environment";
import DS from "ember-data";
import Ember from "ember";

const { RESTAdapter } = DS;
const { Inflector, computed, inject: { service } } = Ember;

const inflector = new Inflector(Inflector.defaultRules);

export default RESTAdapter.extend({
  firebase: service("firebase"),

  host: computed.readOnly("firebase.url"),

  namespace: computed.readOnly("firebase.userId"),

  pathForType: function() {
    const path = this._super(...arguments);
    return `${path}.json?auth=${this.get("firebase.token")}`;
  },

  findAll: function(store, model) {
    return this._super(...arguments).then((payload) => {
      const records = Object.keys(payload || {}).map((id) => {
        return Object.assign({}, payload[id][model.modelName], { id: id });
      });
      return { [inflector.pluralize(model.modelName)]: records };
    });
  },

  createRecord: function(store, model) {
    return this._super(...arguments).then((payload) => {
      const record = Object.assign({}, { id: payload.name });
      return { [inflector.pluralize(model.modelName)]: record };
    });
  }
});
