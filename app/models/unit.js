var Unit = Ember.Model.extend({
    code: Ember.attr(),
    name: Ember.attr()
});

Unit.reopenClass({
    adapter: Ember.FixtureAdapter.create(),
    primaryKey: "code",
    FIXTURES: [
        {code: "hour", name: "godz."},
        {code: "service", name: "usł."},
        {code: "piece", name: "szt."},
        {code: "day", name: "dni"},
        {code: "discount", name: "rabat"},
        {code: "kilogram", name: "kg"},
        {code: "ton", name: "ton"},
        {code: "metre", name: "m"},
        {code: "kilometre", name: "km"},
        {code: "advance", name: "zaliczka"},
        {code: "set", name: "komplet"},
        {code: "squaremetre", name: "m²"},
        {code: "cubicmetre", name: "m³"}
    ]
});

export default Unit;
