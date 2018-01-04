import DS from "ember-data";

const { Model, attr } = DS;

let Unit = Model.extend({
  code: attr(),
  name: attr(),
  nameEN: attr()
});

Unit.reopenClass({
  primaryKey: "code",
  FIXTURES: [
    { id: 1, code: "hour", name: "godz.", nameEN: "hrs" },
    { id: 2, code: "service", name: "usł.", nameEN: "service" },
    { id: 3, code: "piece", name: "szt.", nameEN: "pcs" },
    { id: 4, code: "day", name: "dni", nameEN: "days" },
    { id: 5, code: "discount", name: "rabat", nameEN: "discount" },
    { id: 6, code: "kilogram", name: "kg", nameEN: "kg" },
    { id: 7, code: "ton", name: "ton", nameEN: "tons" },
    { id: 8, code: "metre", name: "m", nameEN: "m" },
    { id: 9, code: "kilometre", name: "km", nameEN: "km" },
    { id: 10, code: "advance", name: "zaliczka", nameEN: "advance" },
    { id: 11, code: "set", name: "komplet", nameEN: "set" },
    { id: 12, code: "squaremetre", name: "m²", nameEN: "m²" },
    { id: 13, code: "cubicmetre", name: "m³", nameEN: "m³" }
  ]
});

export default Unit;
