import Account from "fakturama/models/account";
import AccountForm from "fakturama/forms/account";

var AccountEditRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor("account");
    },

    setupController: function (controller, model) {
        controller.set("model", AccountForm.create({ model: model }));
    }
});

export default AccountEditRoute;
