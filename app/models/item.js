var Item = Ember.Model.extend({
    description: Ember.attr(String),
    quantity: Ember.attr(Number),
    netPrice: Ember.attr(Number),
    unitCode: Ember.attr(String),
    taxRateCode: Ember.attr(String)
});

export default Item;
