import DS from "ember-data";
import Ember from "ember";

const { Model, attr } = DS;
const { computed } = Ember;

let Settings = Model.extend({
  companyName: attr(),
  address: attr(),
  vatin: attr(),
  contactName: attr(),
  numerationTypeCode: attr(),
  dueDays: attr(),

  seller: computed("address", "companyName", "vatin", function () {
    var parts = [this.get("companyName"), this.get("address")];

    if (this.get("vatin")) {
      parts.push("NIP / VATIN: " + this.get("vatin"));
    }

    return parts.join("\n").trim();
  })
});

export default Settings;
