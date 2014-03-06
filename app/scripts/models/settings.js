Faktura.Settings = Ember.Model.extend({
    id: Ember.attr(),
    companyName: Ember.attr(),
    address: Ember.attr(),
    vatin: Ember.attr(),

    seller: function () {
        return [this.get("companyName"), this.get("address"), "NIP / VATIN: " + this.get("vatin")].join("\n");
    }.property("companyName", "address", "vatin")
});

Faktura.Settings.reopenClass({
    url: "settings",
    adapter: Faktura.FirebaseAdapter.create(),

    fetch: function (id) {
        id || (id = "default");
        return this._super.call(this, id);
    },

    find: function (id) {
        id || (id = "default");
        return this._super.call(this, id);
    }
});
