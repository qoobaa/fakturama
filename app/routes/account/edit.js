import Account from "faktura/models/account";
import AccountForm from "faktura/forms/account";

var AccountEditRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor("account");
    },

    setupController: function (controller, model) {
        controller.set("model", AccountForm.create({ model: model }));
    }
});

export default AccountEditRoute;
