import DS from "ember-data";
import ItemPropertiesMixin from "fakturama/mixins/item-properties";

const { Model, attr } = DS;

export default Model.extend(ItemPropertiesMixin, {
  description: attr("string"),
  quantity: attr("number"),
  netPrice: attr("number"),
  unitCode: attr("string"),
  taxRateCode: attr("string")
});
