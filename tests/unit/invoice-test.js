import Invoice from "fakturama/models/invoice";
import TaxRate from "fakturama/models/tax_rate";

var invoice;

module("Unit - Invoice", {
    setup: function () {
        TaxRate.fetch();
        invoice = Invoice.create({
            itemsAttributes: []
        });
    }
});

test("calculates tax correctly", function () {
    expect(3);

    Ember.run(function () {
        invoice.set("itemsAttributes", [{
            taxRateCode: "23",
            netPrice: 24390,
            quantity: 1
        }, {
            taxRateCode: "23",
            netPrice: 24390,
            quantity: 1
        }]);

        strictEqual(invoice.get("totalNetAmount"), 48780);
        strictEqual(invoice.get("totalTaxAmount"), 11219);
        strictEqual(invoice.get("totalGrossAmount"), 59999);
    });
});
