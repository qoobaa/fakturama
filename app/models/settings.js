import FirebaseAdapter from "faktura/adapters/firebase";

var Settings = Ember.Model.extend({
    id: Ember.attr(),
    companyName: Ember.attr(),
    address: Ember.attr(),
    vatin: Ember.attr(),
    contactName: Ember.attr(),

    seller: function () {
        return [this.get("companyName"), this.get("address"), "NIP / VATIN: " + this.get("vatin")].join("\n");
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
    }
});

export default Settings;
