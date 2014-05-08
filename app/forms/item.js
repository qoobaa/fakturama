import ItemPropertiesMixin from "fakturama/mixins/item_properties";
import FormMixin from "fakturama/mixins/form";

var ItemForm = Ember.ObjectProxy.extend(Ember.Validations.Mixin, FormMixin, ItemPropertiesMixin, {
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
    taxRateCode: Ember.computed.oneWay("model.taxRateCode")
});

export default ItemForm;
