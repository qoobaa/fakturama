var TaxRate = Ember.Model.extend({
    code: Ember.attr(),
    value: Ember.attr(),
    name: Ember.attr()
});

TaxRate.reopenClass({
    adapter: Ember.FixtureAdapter.create(),
    primaryKey: "code",
    FIXTURES: [
        { code: "23",     value: 23, name: "23%"  },
        { code: "8",      value:  8, name: "8%"   },
        { code: "5",      value:  5, name: "5%"   },
        { code: "0",      value:  0, name: "0%"   },
        { code: "na",     value:  0, name: "n.p." },
        { code: "exempt", value:  0, name: "zw."  }
    ]
});

export default TaxRate;
