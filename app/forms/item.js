import ItemPropertiesMixin from "faktura/lib/item_properties_mixin";

var ItemForm = Ember.ObjectProxy.extend(Ember.Validations.Mixin, ItemPropertiesMixin, {
    model: Ember.computed.alias("content"),

    validations: {
        description: {
            presence: { if: "invoiceForm.isSubmitted" }
        },
        quantity: {
            presence: { if: "invoiceForm.isSubmitted" },
            numericality: { if: "invoiceForm.isSubmitted" }
        },
        netPrice: {
            presence: { if: "invoiceForm.isSubmitted" },
            numericality: { if: "invoiceForm.isSubmitted" }
        },
        unitCode: {
            presence: { if: "invoiceForm.isSubmitted" }
        },
        taxRateCode: {
            presence: { if: "invoiceForm.isSubmitted" }
        }
    },

    description: Ember.computed.oneWay("model.description"),
    quantity: Ember.computed.oneWay("model.quantity"),
    netPrice: Ember.computed.oneWay("model.netPrice"),
    unitCode: Ember.computed.oneWay("model.unitCode"),
    taxRateCode: Ember.computed.oneWay("model.taxRateCode"),

    toJSON: function () {
        return this.getProperties(this.get("model").constructor.getAttributes());
    }
});

export default ItemForm;
