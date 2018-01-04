import { test } from 'qunit';
import moduleForAcceptance from 'fakturama/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Invoices');

test('invoices renders', function(assert) {
  visit('/invoices');

  andThen(function() {
    assert.equal(find('a.navbar-brand').text(), "Fakturama");
  });
});
