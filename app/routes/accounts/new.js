import Account from "fakturama/models/account";
import AccountForm from "fakturama/forms/account";

var AccountsNewRoute = Ember.Route.extend({
    model: function () {
        return Account.create();
    },

    setupController: function (controller, model) {
        controller.set("model", AccountForm.create({ model: model }));
    }
});

export default AccountsNewRoute;
