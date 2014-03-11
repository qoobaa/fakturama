var Language = Ember.Model.extend({
    code: Ember.attr(),
    name: Ember.attr()
});

Language.reopenClass({
    adapter: Ember.FixtureAdapter.create(),
    primaryKey: "code",
    FIXTURES: [
        {code: "pl", name: "polska"},
        {code: "plen", name: "polsko-angielska"}
    ]
});

export default Language;
