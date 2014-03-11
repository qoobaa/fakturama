var Currency = Ember.Model.extend({
    code: Ember.attr(),
    name: Ember.attr(),

    nameWithCode: function () {
        return "%@ (%@)".fmt(this.get("name"), this.get("code"));
    }.property("code", "name")
});

Currency.reopenClass({
    adapter: Ember.FixtureAdapter.create(),
    primaryKey: "code",
    FIXTURES: [
        { code: "PLN", name: "złoty", precision: 2 },
        { code: "GBP", name: "funt szterling", precision: 2 },
        { code: "USD", name: "dolar amerykański", precision: 2 },
        { code: "EUR", name: "euro", precision: 2 },
        { code: "CHF", name: "frank szwajcarski", precision: 2 },
        { code: "CZK", name: "korona czeska", precision: 2 },
        { code: "NOK", name: "korona norweska", precision: 2 },
        { code: "SEK", name: "korona szwedzka", precision: 2 },
        { code: "CAD", name: "dolar kanadyjski", precision: 2 },
        { code: "DKK", name: "korona duńska", precision: 2 },
        { code: "HUF", name: "forint", precision: 0 }
    ]
});

export default Currency;
