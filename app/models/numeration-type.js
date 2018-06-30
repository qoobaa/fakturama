import DS from 'ember-data';

const { Model, attr } = DS;

let NumerationType = Model.extend({
  code: attr(),
  name: attr()
});

NumerationType.reopenClass({
  primaryKey: 'code',
  FIXTURES: [
    { id: 1, code: 'month', name: 'miesięczny' },
    { id: 2, code: 'year', name: 'roczny' }
  ]
});

export default NumerationType;
