Faktura.FirebaseAdapter = Ember.RESTAdapter.extend({
    findAll: function(klass, records) {
        var url = this.buildURL(klass),
            self = this;

        return this.ajax(url).then(function (data) {
            return Object.keys(data).map(function (id) {
                return $.extend({}, data[id], { id: id });
            });
        }).then(function(data) {
            self.didFindAll(klass, records, data);
            return records;
        });
    },

    createRecord: function(record) {
        var url = this.buildURL(record.constructor),
            self = this;

        return this.ajax(url, record.toJSON(), "POST").then(function (data) {
            return $.extend({}, record.toJSON(), { id: data.name });
        }).then(function (data) {
            self.didCreateRecord(record, data);
            return record;
        });
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
