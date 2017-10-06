import config from "fakturama/config/environment";
import DS from "ember-data";
import Ember from "ember";

const { RESTAdapter } = DS;
const { computed, inject: { service } } = Ember;

export default RESTAdapter.extend({
  firebase: service("firebase"),

  host: computed.readOnly("firebase.url"),

  namespace: computed.readOnly("firebase.userId"),

  pathForType: function() {
    const path = this._super(...arguments);
    return `${path}.json?auth=${this.get("firebase.token")}`;
  },

  findAll: function() {
    return this._super(...arguments).then((payload) => {
      return payload || [];
    });
  },

  didFindAll: function(klass, records, data) {
    this._super(klass, records, Object.keys(data || {}).map(function (id) {
      return $.extend({}, data[id], { id: id });
    }));
  },

  didCreateRecord: function(record, data) {
    this._super(record, $.extend({}, record.getProperties(record.constructor.getAttributes()), { id: data.name }));
  }
});
