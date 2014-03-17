import Account from "faktura/models/account";
import AccountForm from "faktura/forms/account";

var AccountsNewRoute = Ember.Route.extend({
    model: function () {
        return Account.create();
    },

    setupController: function (controller, model) {
        controller.set("model", AccountForm.create({ model: model }));
    }
});

export default AccountsNewRoute;
