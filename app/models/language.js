import DS from "ember-data";

const { Model, attr } = DS;

let Language = Model.extend({
  code: attr(),
  name: attr()
});

Language.reopenClass({
  primaryKey: "code",
  FIXTURES: [
    { code: "pl", name: "polska" },
    { code: "plen", name: "polsko-angielska" }
  ]
});

export default Language;
