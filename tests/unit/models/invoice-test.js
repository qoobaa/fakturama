import { run } from '@ember/runloop';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('invoice', 'Unit | Model | invoice', {
  integration: true,
  // needs: ['model:tax-rate', 'adapter:tax-rate'],
});

test('it calculates tax correctly', function(assert) {
  assert.expect(3);

  let model = this.subject();

  run(function() {
    model.set("itemsAttributes", [{
      taxRateCode: "23",
      netPrice: 24390,
      quantity: 1
    }, {
      taxRateCode: "23",
      netPrice: 24390,
      quantity: 1
    }]);

    const done = assert.async();

    run(function() {
      assert.equal(model.get("totalNetAmount"), 48780);
      assert.equal(model.get("totalTaxAmount"), 11219);
      assert.equal(model.get("totalGrossAmount"), 59999);
      done();
    });
  });
});
