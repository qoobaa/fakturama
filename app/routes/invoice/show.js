import InvoicePresenter from "faktura/presenters/invoice";

var InvoiceShowRoute = Ember.Route.extend({
    model: function (params) {
        return this.modelFor("invoice");
    },

    setupController: function (controller, model) {
        controller.set("model", InvoicePresenter.create({ model: model }));
    }
});

export default InvoiceShowRoute;
