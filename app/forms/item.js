import ItemPresenter from "faktura/presenters/item";

var ItemForm = ItemPresenter.extend(Ember.Validations.Mixin, {
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
        unit: {
            presence: { if: "invoiceForm.isSubmitted" }
        },
        formattedTaxRate: {
            presence: { if: "invoiceForm.isSubmitted" }
        }
    },

    description: Ember.computed.oneWay("model.description"),
    quantity: Ember.computed.oneWay("model.quantity"),
    netPrice: Ember.computed.oneWay("model.netPrice"),
    unit: Ember.computed.oneWay("model.unit"),
    formattedTaxRate: Ember.computed.oneWay("model.formattedTaxRate"),

    toJSON: function () {
        return this.getProperties("description", "quantity", "netPrice", "unit", "formattedTaxRate");
    }
});

export default ItemForm;
