Faktura.Settings = Ember.Model.extend({
    id: Ember.attr(),
    name: Ember.attr()
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
