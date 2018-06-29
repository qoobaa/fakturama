import DS from 'ember-data';

const { Model, attr } = DS;

let Language = Model.extend({
  code: attr(),
  name: attr()
});

Language.reopenClass({
  primaryKey: 'code',
  FIXTURES: [
    { id: 1, code: 'pl', name: 'polska' },
    { id: 2, code: 'plen', name: 'polsko-angielska' }
  ]
});

export default Language;
