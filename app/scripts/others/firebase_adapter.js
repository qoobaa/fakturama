Faktura.FirebaseAdapter = Ember.RESTAdapter.extend({
    didFindAll: function (klass, records, data) {
        this._super(klass, records, Object.keys(data || {}).map(function (id) {
            return $.extend({}, data[id], { id: id });
        }));
    },

    didCreateRecord: function (record, data) {
        this._super(record, $.extend({}, record.toJSON(), { id: data.name }));
    },

    ajaxSettings: function (url, method) {
        return {
            url: Faktura.config.firebaseURL + Faktura.config.userId + "/" + url + "?auth=" + Faktura.config.firebaseAuthToken,
            type: method
        };
    }
});
