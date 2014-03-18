var NumerationType = Ember.Model.extend({
    code: Ember.attr(),
    name: Ember.attr()
});

NumerationType.reopenClass({
    adapter: Ember.FixtureAdapter.create(),
    primaryKey: "code",
    FIXTURES: [
        { code: "month", name: "miesięczny" },
        { code: "year", name: "roczny" }
    ]
});

export default NumerationType;
