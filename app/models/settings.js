import FirebaseAdapter from "faktura/adapters/firebase";

var Settings = Ember.Model.extend({
    id: Ember.attr(),
    companyName: Ember.attr(),
    address: Ember.attr(),
    vatin: Ember.attr(),
    contactName: Ember.attr(),
    numerationTypeCode: Ember.attr(),

    seller: function () {
        var parts = [this.get("companyName"), this.get("address")];

        if (this.get("vatin")) {
            parts.push("NIP / VATIN: " + this.get("vatin"));
        }

        return parts.join("\n").trim();
    }.property("companyName", "address", "vatin")
});

Settings.reopenClass({
    url: "settings",
    adapter: FirebaseAdapter.create(),

    fetch: function (id) {
        if (!id) {
            id = "default";
        }
        return this._super.call(this, id);
    },

    find: function (id) {
        if (!id) {
            id = "default";
        }

        return this._super.call(this, id);
    },

    clearCache: function () {
        this._super.apply(this, arguments);
        this._findAllRecordArray = undefined;
    }
});

export default Settings;
