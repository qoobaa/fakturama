import Ember from 'ember';
import formatCents from 'fakturama/lib/format_cents';
import parseCents from 'fakturama/lib/parse_cents';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'input',

  attributeBindings: ['type', 'value', 'step'],

  type: 'number',

  precision: 2,

  value: 0,

  step: computed('precision', {
    get() {
      return String(1 / Math.pow(10, this.get('precision')));
    },
    set(_key, value) {
      const fractionalPart = String(value).split(".")[1];
      this.set('precision', fractionalPart ? fractionalPart.length : 0);
      return value;
    }
  }),

  cents: computed('value', 'precision', {
    get() {
      return parseCents(this.get('value'), this.get('precision'));
    },
    set(_key, value) {
      this.set('value', formatCents(value, this.get('precision')));
      return value;
    }
  })
});
