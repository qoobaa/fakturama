Faktura.IndexController = Ember.ArrayController.extend({
    number: "",
    isNumberEmpty: function () {
        return $.trim(this.get("number")) == "";
    }.property("number"),
    isEditingNumber: false,

    dateOfIssue: undefined,
    isEditingDateOfIssue: false,

    dateOfSale: undefined,
    isEditingDateOfSale: false,

    dueDate: undefined,
    isEditingDueDate: false,

    currency: "CAD",
    seller: "",

    units: ["godzina", "usługa", "sztuka", "dzień", "rabat", "kg", "ton", "m", "km", "zaliczka", "komplet", "m²", "m³"],
    taxRates: ["0%", "5%", "8%", "23%", "n.p.", "zw."],

    init: function () {
        this._super.apply(this, arguments);
        this.set("content", [Faktura.Item.create(), Faktura.Item.create()]);
    },

    actions: {
        editNumber: function () {
            this.set("isEditingNumber", true);
        },

        editDateOfIssue: function () {
            this.set("isEditingDateOfIssue", true);
        },

        editDateOfSale: function () {
            this.set("isEditingDateOfSale", true);
        },

        editDueDate: function () {
            this.set("isEditingDueDate", true);
        },

        edit: function (item) {
            item.set("isEditing", true);
        }
    }
});
