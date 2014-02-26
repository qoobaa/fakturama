var Faktura = Ember.Application.create({
    units: ["godz.", "usł.", "szt.", "dni", "rabat", "kg", "ton", "m", "km", "zaliczka", "komplet", "m²", "m³"],
    englishUnits: ["hrs", "service", "pcs", "days", "discount", "kg", "tons", "m", "km", "advance", "set", "m²", "m³"],
    taxRates: ["23%", "8%", "5%", "0%", "n.p.", "zw."],
    currencies: ["PLN", "GBP", "USD", "EUR", "CHF", "CZK", "NOK", "SEK", "CAD", "DKK", "HUF"],
    languages: ["polska", "polsko-angielska"],
    config: {
        firebaseURL: "https://faktura-cowbell.firebaseio.com/"
    }
});

// Faktura.InvoiceRoute = Ember.Route.extend({
//     model: function (params) {
//         return Faktura.Invoice.fromJSON({ items: [{}] });
//     }
// });

Ember.Handlebars.helper("integerToCurrency", function (value, options) {
    var integerPart, fractionalPart, precision;

    options || (options = {});
    precision = options.hash.hasOwnProperty("precision") ? options.hash.precision : 2;

    return Faktura.formatCents(value, precision);
});

Faktura.initializer({
    name: "auth",

    initialize: function (container, application) {
        application.register("auth:main", application.Auth);
    }
});

Faktura.initializer({
    name: "injectAuth",
    before: "auth",

    initialize: function (container, application) {
        application.inject("controller", "auth", "auth:main");
        application.inject("route", "auth", "auth:main");
    }
 });
