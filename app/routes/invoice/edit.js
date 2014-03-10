import Invoice from "faktura/models/invoice";
import InvoiceForm from "faktura/forms/invoice";

var InvoiceEditRoute = Ember.Route.extend({
    model: function (params) {
        return this.modelFor("invoice");
    },

    setupController: function (controller, model) {
        controller.set("model", InvoiceForm.create({ model: model }));
    }
});

export default InvoiceEditRoute;
