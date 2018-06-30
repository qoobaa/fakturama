import { helper } from '@ember/component/helper';
import formatCents from 'fakturama/lib/format_cents';

export default helper(function(value, { options: { hash = {} } = {} }) {
  const precision = (hash || {}).precision || 2;

  return formatCents(value, precision);
});
