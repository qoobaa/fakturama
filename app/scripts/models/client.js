Faktura.Client = Ember.Model.extend({

});

Faktura.Client.url = Faktura.config.firebaseURL + "/clients";
Faktura.Client.adapter = Ember.RESTAdapter.create();
