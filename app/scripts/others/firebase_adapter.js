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
        var auth = Faktura.__container__.lookup("controller:currentUser").get("firebaseAuthToken"),
            id = Faktura.__container__.lookup("controller:currentUser").get("id");

        return {
            url: Faktura.config.firebaseURL + id + "/" + url + "?auth=" + auth,
            type: method,
            dataType: "json"
        };
    }
});
