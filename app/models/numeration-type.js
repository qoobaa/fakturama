import DS from "ember-data";

const { Model, attr } = DS;

let NumerationType = Model.extend({
  code: attr(),
  name: attr()
});

NumerationType.reopenClass({
  primaryKey: "code",
  FIXTURES: [
    { code: "month", name: "miesięczny" },
    { code: "year", name: "roczny" }
  ]
});

export default NumerationType;
