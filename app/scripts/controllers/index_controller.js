Faktura.IndexController = Ember.Controller.extend({
    currency: "CAD",

    init: function () {
        this._super.apply(this, arguments);
        this.set("items", [Faktura.Item.create(), Faktura.Item.create()]);
    }
});
