import Account from "faktura/models/account";

var AccountsIndexRoute = Ember.Route.extend({
    model: function () {
        return Account.fetch();
    }
});

export default AccountsIndexRoute;
