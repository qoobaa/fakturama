function formatCents(value, precision) {
  var integerPart,
    fractionalPart,
    minus = '';

  if (!isFinite(precision)) {
    precision = 2;
  }

  if (!value) {
    value = '0';
  }

  value = String(value);

  if (value[0] === '-') {
    minus = '-';
    value = value.substr(1);
  }

  value = new Array(precision + 1).join('0').slice(value.length - 1) + value;
  integerPart = value.substr(0, value.length - precision);
  fractionalPart = value.slice(-precision);

  if (precision > 0) {
    return minus + [integerPart, fractionalPart].join('.');
  } else {
    return minus + integerPart;
  }
}

export default formatCents;
