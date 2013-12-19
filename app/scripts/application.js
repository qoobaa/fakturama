var Faktura = Ember.Application.create({
    units: ["godz.", "usł.", "szt.", "dni", "rabat", "kg", "ton", "m", "km", "zaliczka", "komplet", "m²", "m³"],
    englishUnits: ["hrs", "service", "pcs", "days", "discount", "kg", "tons", "m", "km", "advance", "set", "m²", "m³"],
    taxRates: ["23%", "8%", "5%", "0%", "n.p.", "zw."],
    currencies: ["PLN", "GBP", "USD", "EUR", "CHF", "CZK", "NOK", "SEK", "CAD", "DKK", "HUF"],
    languages: ["polski", "polsko-angielski"]
});

Ember.TextField.reopen({ attributeBindings: ["min", "max", "step"] });

String.prototype.integerize = function (precision) {
    var integerPart, fractionalPart,
        parts = this.replace(",", ".").split(".");

    if (arguments.length == 0) {
        precision = 2;
    }

    integerPart = (parts[0] || "0");
    fractionalPart = (parts[1] || "").substr(0, precision);

    while (fractionalPart.length < precision) {
        fractionalPart += "0";
    }

    return parseInt(integerPart + fractionalPart, 10);
};

String.prototype.monetize = function (precision) {
    var value, integerPart, fractionalPart;

    if (arguments.length == 0) {
        precision = 2;
    }

    value = this;

    while (value.length < precision + 1) {
        value = "0" + value;
    }

    integerPart = value.substr(0, value.length - precision);
    fractionalPart = value.substr(value.length - precision, precision);

    while (fractionalPart.length < precision) {
        fractionalPart += "0";
    }

    return [integerPart, fractionalPart].join(".");
};

Ember.Handlebars.helper("integerToCurrency", function (value, options) {
    var integerPart, fractionalPart, precision;

    options || (options = {});
    precision = options.hasOwnProperty("precision") ? options.precision : 2;

    return String(value).monetize(precision);
});

// TODO: extract to an external library

function polishToWords(number) {
    var HUNDREDS = ["", "sto ", "dwieście ", "trzysta ", "czterysta ", "pięćset ", "sześćset ", "siedemset ", "osiemset ", "dziewięćset "],
        TENS = ["", "dziesięć ", "dwadzieścia ", "trzydzieści ", "czterdzieści ", "pięćdziesiąt ", "sześćdziesiąt ", "siedemdziesiąt ", "osiemdziesiąt ", "dziewięćdziesiąt "],
        TEENS = ["", "jedenaście ", "dwanaście ", "trzynaście ", "czternaście ", "piętnaście ", "szesnaście ", "siedemnaście ", "osiemnaście ", "dziewiętnaście "],
        UNITIES = ["", "jeden ", "dwa ", "trzy ", "cztery ", "pięć ", "sześć ", "siedem ", "osiem ", "dziewięć "],
        ZERO = "zero",
        THOUSANDS = { one: "tysiąc", few: "tysiące", many: "tysięcy" },
        MILIONS = { one: "milion", few: "miliony", many: "milionów" };

    function process0999(digits) {
        var result = "";

        result += HUNDREDS[digits[0]];

        if (digits[1] === 1 && digits[2] !== 0) {
            result += TEENS[digits[2]];
        } else {
            result += TENS[digits[1]];
            result += UNITIES[digits[2]];
        }

        return result;
    }

    function classify(digits) {
        if (digits.join("") === "001") {
            return "one";
        } else if (digits[1] !== 1 && (digits[2] === 2 || digits[2] === 3 || digits[2] === 4)) {
            return "few";
        } else {
            return "many";
        }
    }

    var result = "",
        digits = String(number).split("").map(function (digit) {
            return parseInt(digit, 10);
        });

    if (digits.length > 9) {
        return "w pizdu";
    }

    while (digits.length < 9) {
        digits.unshift(0);
    }

    if (parseInt(number, 10) === 0) {
        result += ZERO;
    } else {
        result += process0999(digits.slice(0, 3));
        if (digits.slice(0, 3).join("") !== "000") {
            result += MILIONS[classify(digits.slice(0, 3))];
        }

        result += " ";
        result += process0999(digits.slice(3, 6));
        if (digits.slice(3, 6).join("") !== "000") {
            result += THOUSANDS[classify(digits.slice(3, 6))];
        }

        result += " ";
        result += process0999(digits.slice(6, 9));

    }

    return result.trim();
}
