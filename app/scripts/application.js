var Faktura = Ember.Application.create();

Ember.TextField.reopen({ attributeBindings: ["min", "max", "step"] });

String.prototype.integerize = function (decimalPlaces) {
    var integerPart, fractionalPart,
        parts = this.replace(",", ".").split(".");

    if (arguments.length == 0) {
        decimalPlaces = 2;
    }

    integerPart = (parts[0] || "0");
    fractionalPart = (parts[1] || "").substr(0, decimalPlaces);

    while (fractionalPart.length < decimalPlaces) {
        fractionalPart += "0";
    }

    return parseInt(integerPart + fractionalPart, 10);
};
