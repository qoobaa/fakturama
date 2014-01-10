Faktura.IndexController = Ember.Controller.extend({
    actions: {
        removeItem: function (item) {
            this.get("model.items").removeObject(item);
        },
        addItem: function () {
            this.get("model.items").pushObject(Faktura.Item.create());
        },
        setLanguage: function (language) {
            this.set("model.language", language);
        },
        setCurrency: function (currency) {
            this.set("model.currency", currency);
        },
        print: function () {
            window.print();
        },
        save: function () {
            this.transitionToRoute("index", this.get("model").toString());
        }
    }
});
