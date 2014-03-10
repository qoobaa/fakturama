import Invoice from "faktura/models/invoice";
import InvoiceForm from "faktura/forms/invoice";

var InvoiceEditRoute = Ember.Route.extend({
    model: function (params) {
        return Invoice.fetch(params.invoice_id);
    },

    setupController: function (controller, model) {
        controller.set("model", InvoiceForm.create({ model: model }));
    }
});

export default InvoiceEditRoute;
