var TaxRate = Ember.Model.extend({
    code: Ember.attr(),
    value: Ember.attr(),
    name: Ember.attr(),
    nameEN: Ember.attr()
});

TaxRate.reopenClass({
    adapter: Ember.FixtureAdapter.create(),
    primaryKey: "code",
    FIXTURES: [
        { code: "23",     value: 23, name: "23%",  nameEN: null },
        { code: "8",      value:  8, name: "8%",   nameEN: null },
        { code: "5",      value:  5, name: "5%",   nameEN: null },
        { code: "0",      value:  0, name: "0%",   nameEN: null },
        { code: "na",     value:  0, name: "n.p.", nameEN: "n/a" },
        { code: "exempt", value:  0, name: "zw.",  nameEN: "exempt" }
    ]
});

export default TaxRate;
