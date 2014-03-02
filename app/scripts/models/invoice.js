Faktura.Invoice = Ember.Model.extend({
    id: Ember.attr(),
    number: Ember.attr()
});

Faktura.Invoice.reopenClass({
    url: "invoices",
    adapter: Faktura.FirebaseAdapter.create()
});
