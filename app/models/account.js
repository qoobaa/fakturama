import { computed } from '@ember/object';
import DS from "ember-data";

const { Model, attr } = DS;

export default Model.extend({
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
