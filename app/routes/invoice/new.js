import Invoice from "faktura/models/invoice";
import InvoiceForm from "faktura/forms/invoice";

var InvoiceNewRoute = Ember.Route.extend({
    model: function () {
        return Invoice.create();
    },

    setupController: function (controller, model) {
        controller.set("model", InvoiceForm.create({ model: model }));
    }
});

export default InvoiceNewRoute;
