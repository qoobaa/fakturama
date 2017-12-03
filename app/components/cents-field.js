import Component from '@ember/component';
import { computed } from '@ember/object';
import formatCents from 'fakturama/lib/format_cents';
import parseCents from 'fakturama/lib/parse_cents';

const defaultPrecision = 2;

export default Component.extend({
  tagName: 'input',

  attributeBindings: ['type', 'step', 'value', 'disabled'],

  type: 'number',

  precision: defaultPrecision,

  init() {
    this._super(...arguments);
    const cents = this.get('cents');
    const precision = this.get('precision');
    this.set('value', formatCents(cents, precision));
  },

  change(event) {
    const { target: { value }} = event;
    const precision = this.get('precision');
    const cents = parseCents(value, precision);
    this.attrs.cents.update(cents);
  },

  step: computed('precision', function() {
    const precision = parseInt(this.get('precision') || defaultPrecision, 10);

    return String(1 / Math.pow(10, precision));
  })
});
