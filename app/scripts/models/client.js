Faktura.Client = Ember.Model.extend({
    id: Ember.attr(),
    name: Ember.attr(),
    address: Ember.attr(),
    vatin: Ember.attr()
});

Faktura.Client.reopenClass({
    url: "clients",
    adapter: Faktura.FirebaseAdapter.create()
});
