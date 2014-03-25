import Invoice from "fakturama/models/invoice";
import InvoiceForm from "fakturama/forms/invoice";

var InvoiceRoute = Ember.Route.extend({
    model: function (params) {
        return Invoice.fetch(params.invoice_id);
    }
});

export default InvoiceRoute;
