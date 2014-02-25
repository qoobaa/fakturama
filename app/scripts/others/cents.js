Faktura.parseCents = function (value, precision) {
    var integerPart, fractionalPart,
        parts = String(value).split(".");

    if (arguments.length < 2) {
        precision = 2;
    }

    integerPart = parts[0] || "0";
    fractionalPart = parts[1] || "0";
    fractionalPart += new Array(precision + 1).join("0");

    return parseInt(integerPart + fractionalPart.substr(0, precision), 10);
};

Faktura.formatCents = function (value, precision) {
    var integerPart, fractionalPart,
        minus = "";

    if (arguments.length < 2) {
        precision = 2;
    }

    value || (value = "0");
    value = String(value);

    if (value[0] === "-") {
        minus = "-";
        value = value.substr(1);
    }

    value = new Array(precision + 1).join("0").slice(value.length - 1) + value;
    integerPart = value.substr(0, value.length - precision);
    fractionalPart = value.slice(-precision);

    if (precision > 0) {
        return minus + [integerPart, fractionalPart].join(".");
    } else {
        return minus + integerPart;
    }
};
