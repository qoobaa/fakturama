import ItemPropertiesMixin from "fakturama/mixins/item_properties";

var Item = Ember.Model.extend(ItemPropertiesMixin, {
    description: Ember.attr(String),
    quantity: Ember.attr(Number),
    netPrice: Ember.attr(Number),
    unitCode: Ember.attr(String),
    taxRateCode: Ember.attr(String)
});

export default Item;
