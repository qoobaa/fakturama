import DS from "ember-data";
import Ember from "ember";
import Inflector from "ember-inflector";
import { readOnly } from "@ember/object/computed";
import { inject as service } from "@ember/service";

const { RESTAdapter } = DS;

const host = Ember.testing ? "/" : readOnly("firebase.url");
const inflector = new Inflector(Inflector.defaultRules);
const namespace = Ember.testing ? "" : readOnly("firebase.userId");

export default RESTAdapter.extend({
  host,
  namespace,
  defaultSerializer: "firebase",
  firebase: service("firebase"),

  buildURL() {
    const url = `${this._super(...arguments)}.json?auth=${this.get(
      "firebase.token"
    )}`;
    return url.startsWith("http") ? url : `/${url}`;
  },

  createRecord(store, model) {
    return this._super(...arguments).then(payload => {
      const record = Object.assign({}, { id: payload.name });
      return { [inflector.pluralize(model.modelName)]: record };
    });
  },

  findAll(store, model) {
    return this._super(...arguments).then(payload => {
      const records = Object.keys(payload || {}).map(id => {
        return Object.assign({}, payload[id], { id });
      });
      return { [inflector.pluralize(model.modelName)]: records };
    });
  },

  findRecord(store, model, id) {
    return this._super(...arguments).then(payload => {
      const record = Object.assign({}, payload, { id });
      return { [inflector.pluralize(model.modelName)]: record };
    });
  },

  updateRecord(store, model, snapshot) {
    return this._super(...arguments).then(payload => {
      const record = Object.assign({}, payload, { id: snapshot.id });
      return { [inflector.pluralize(model.modelName)]: record };
    });
  }
});
