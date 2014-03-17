import Account from "faktura/models/account";

var AccountRoute = Ember.Route.extend({
    model: function (params) {
        return Account.fetch(params.account_id);
    }
});

export default AccountRoute;
