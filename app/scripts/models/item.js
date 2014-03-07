Faktura.Item = Ember.Model.extend({
    quantity: Ember.attr(),
    description: Ember.attr(),
    netPrice: Ember.attr(),
    unit: Ember.attr(),
    formattedTaxRate: Ember.attr()
});
