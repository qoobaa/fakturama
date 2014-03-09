import FirebaseAdapter from "faktura/adapters/firebase";

var Client = Ember.Model.extend({
    id: Ember.attr(),
    name: Ember.attr(),
    address: Ember.attr(),
    vatin: Ember.attr()
});

Client.reopenClass({
    url: "clients",
    adapter: FirebaseAdapter.create()
});

export default Client;
