import FirebaseAdapter from "fakturama/adapters/firebase";

var Account = Ember.Model.extend({
    id: Ember.attr(),
    bankName: Ember.attr(),
    swift: Ember.attr(),
    number: Ember.attr(),
    description: Ember.attr(),

    name: function () {
        if (this.get("description")) {
            return this.get("description");
        } else {
            return [this.get("bankName"), this.get("number")].compact().join(" ");
        }
    }.property("description", "number", "bankName")
});

Account.reopenClass({
    url: "accounts",
    adapter: FirebaseAdapter.create(),

    clearCache: function () {
        this._super.apply(this, arguments);
        this._findAllRecordArray = undefined;
    }
});

export default Account;
