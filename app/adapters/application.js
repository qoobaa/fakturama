import DS from "ember-data";

const { RESTAdapter } = DS;

export default RESTAdapter.extend({
  didFindAll: function(klass, records, data) {
    this._super(klass, records, Object.keys(data || {}).map(function (id) {
      return $.extend({}, data[id], { id: id });
    }));
  },

  didCreateRecord: function(record, data) {
    this._super(record, $.extend({}, record.getProperties(record.constructor.getAttributes()), { id: data.name }));
  },

  ajaxSettings: function(url, method) {
    return {
      url: window.ENV.FIREBASE_URL + window.ENV.FIREBASE_USER_ID + "/" + url + "?auth=" + window.ENV.FIREBASE_AUTH_TOKEN,
      type: method
    };
  }
});
