import Resolver from "ember/resolver";

var App = Ember.Application.extend({
    units: ["godz.", "usł.", "szt.", "dni", "rabat", "kg", "ton", "m", "km", "zaliczka", "komplet", "m²", "m³"],
    englishUnits: ["hrs", "service", "pcs", "days", "discount", "kg", "tons", "m", "km", "advance", "set", "m²", "m³"],
    taxRates: ["23%", "8%", "5%", "0%", "n.p.", "zw."],
    // currencies: ["PLN", "GBP", "USD", "EUR", "CHF", "CZK", "NOK", "SEK", "CAD", "DKK", "HUF"],
    languages: ["polska", "polsko-angielska"],
    modulePrefix: "faktura",
    Resolver: Resolver["default"]
});

export default App;
