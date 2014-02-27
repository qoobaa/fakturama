Faktura.Client = Ember.Model.extend({
    id: Ember.attr(),
    name: Ember.attr()
});

Faktura.Client.url = "clients";
Faktura.Client.adapter = Faktura.FirebaseAdapter.create();
