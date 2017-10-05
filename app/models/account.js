import DS from "ember-data";
import Ember from "ember";

const { Model, attr } = DS;
const { computed } = Ember;

export default Model.extend({
  id: attr(),
  bankName: attr(),
  swift: attr(),
  number: attr(),
  description: attr(),
  name: computed("bankName", "description", "number", function() {
    if (this.get("description")) {
      return this.get("description");
    } else {
      return [this.get("bankName"), this.get("number")].compact().join(" ");
    }
  })
});
