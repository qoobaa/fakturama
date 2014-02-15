var Faktura = Ember.Application.create({
    units: ["godz.", "usł.", "szt.", "dni", "rabat", "kg", "ton", "m", "km", "zaliczka", "komplet", "m²", "m³"],
    englishUnits: ["hrs", "service", "pcs", "days", "discount", "kg", "tons", "m", "km", "advance", "set", "m²", "m³"],
    taxRates: ["23%", "8%", "5%", "0%", "n.p.", "zw."],
    currencies: ["PLN", "GBP", "USD", "EUR", "CHF", "CZK", "NOK", "SEK", "CAD", "DKK", "HUF"],
    languages: ["polska", "polsko-angielska"]
});

Faktura.IndexRoute = Ember.Route.extend({
    model: function (params) {
        if (params.invoice) {
            return Faktura.Invoice.fromString(params.invoice);
        } else {
            return Faktura.Invoice.fromJSON({ items: [{}] });
        }
    }
});

Ember.TextField.reopen({ attributeBindings: ["min", "max", "step"] });

String.prototype.integerize = function (precision) {
    var integerPart, fractionalPart,
        parts = this.replace(",", ".").split(".");

    if (arguments.length === 0) {
        precision = 2;
    }

    integerPart = (parts[0] || "0");
    fractionalPart = (parts[1] || "").substr(0, precision);

    while (fractionalPart.length < precision) {
        fractionalPart += "0";
    }

    return parseInt(integerPart + fractionalPart, 10);
};

String.prototype.monetize = function (precision) {
    var value, integerPart, fractionalPart;

    if (arguments.length === 0) {
        precision = 2;
    }

    value = this;

    while (value.length < precision + 1) {
        value = "0" + value;
    }

    integerPart = value.substr(0, value.length - precision);
    fractionalPart = value.substr(value.length - precision, precision);

    while (fractionalPart.length < precision) {
        fractionalPart += "0";
    }

    return [integerPart, fractionalPart].join(".");
};

Ember.Handlebars.helper("integerToCurrency", function (value, options) {
    var integerPart, fractionalPart, precision;

    options || (options = {});
    precision = options.hasOwnProperty("precision") ? options.precision : 2;

    return String(value).monetize(precision);
});
