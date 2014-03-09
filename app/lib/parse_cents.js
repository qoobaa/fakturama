function parseCents(value, precision) {
    var integerPart, fractionalPart,
        parts = String(value).split(".");

    if (arguments.length < 2) {
        precision = 2;
    }

    integerPart = parts[0] || "0";
    fractionalPart = parts[1] || "0";
    fractionalPart += new Array(precision + 1).join("0");

    return parseInt(integerPart + fractionalPart.substr(0, precision), 10);
}

export default parseCents;
