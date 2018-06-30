import DS from 'ember-data';

const { Model, attr } = DS;

let TaxRate = Model.extend({
  code: attr(),
  value: attr(),
  name: attr(),
  nameEN: attr()
});

TaxRate.reopenClass({
  primaryKey: 'code',
  FIXTURES: [
    { id: 1, code: '23', value: 23, name: '23%', nameEN: null },
    { id: 2, code: '8', value: 8, name: '8%', nameEN: null },
    { id: 3, code: '5', value: 5, name: '5%', nameEN: null },
    { id: 4, code: '0', value: 0, name: '0%', nameEN: null },
    { id: 5, code: 'na', value: 0, name: 'n.p.', nameEN: 'n/a' },
    { id: 6, code: 'exempt', value: 0, name: 'zw.', nameEN: 'exempt' }
  ]
});

export default TaxRate;
