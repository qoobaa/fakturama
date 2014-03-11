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
        return this.getProperties("description", "quantity", "netPrice", "unitCode", "taxRateCode");
    }
});

export default ItemForm;
