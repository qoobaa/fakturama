import formatCents from "fakturama/lib/format_cents";

export default Ember.Handlebars.makeBoundHelper(function (value, options) {
    var integerPart, fractionalPart, precision;

    if (!options) {
        options = {};
    }

    precision = options.hash.hasOwnProperty("precision") ? options.hash.precision : 2;

    return formatCents(value, precision);
});
