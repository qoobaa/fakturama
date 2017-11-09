import Ember from 'ember'
import formatCents from 'fakturama/lib/format_cents';

const { Helper: { helper } } = Ember;

export default helper(function (value, { options: { hash = {} } = {} }) {

  const precision = (hash || {}).precision || 2;

  return formatCents(value, precision);
});
