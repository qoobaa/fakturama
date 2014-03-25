import ItemPropertiesMixin from "fakturama/lib/item_properties_mixin";

var Item = Ember.Model.extend(ItemPropertiesMixin, {
    description: Ember.attr(String),
    quantity: Ember.attr(Number),
    netPrice: Ember.attr(Number),
    unitCode: Ember.attr(String),
    taxRateCode: Ember.attr(String)
});

export default Item;
