import DS from "ember-data";
import Ember from "ember";

const { Model, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  companyName: attr(),
  address: attr(),
  vatin: attr(),
  contactName: attr(),
  contactEmail: attr(),
  gravatarURL: computed("md5_hash", function () {
    const md5 = window.md5(this.getWithDefault("contactEmail", ""));
    return `//www.gravatar.com/avatar/${md5}?d=mm`;
  }),
  buyer: computed("address", "companyName", "vatin", function () {
    let parts = [this.get("companyName"), this.get("address")];

    if (this.get("vatin")) {
      parts.push("NIP / VATIN: " + this.get("vatin"));
    }

    return parts.join("\n").trim();
  })
});
