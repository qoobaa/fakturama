import { computed } from '@ember/object';
import DS from "ember-data";

const { Model, attr } = DS;

let Currency = Model.extend({
  code: attr(),
  name: attr(),
  precision: attr(),
  nameWithCode: computed("code", "name", function () {
    return "%@ (%@)".fmt(this.get("name"), this.get("code"));
  })
});

Currency.reopenClass({
  primaryKey: "code",
  FIXTURES: [
    { id: 1, code: "PLN", name: "złoty", precision: 2 },
    { id: 2, code: "GBP", name: "funt szterling", precision: 2 },
    { id: 3, code: "USD", name: "dolar amerykański", precision: 2 },
    { id: 4, code: "EUR", name: "euro", precision: 2 },
    { id: 5, code: "CHF", name: "frank szwajcarski", precision: 2 },
    { id: 6, code: "CZK", name: "korona czeska", precision: 2 },
    { id: 7, code: "NOK", name: "korona norweska", precision: 2 },
    { id: 8, code: "SEK", name: "korona szwedzka", precision: 2 },
    { id: 9, code: "CAD", name: "dolar kanadyjski", precision: 2 },
    { id: 10, code: "DKK", name: "korona duńska", precision: 2 }
  ]
});

export default Currency;
