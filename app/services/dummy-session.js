import Service from "@ember/service";
import { resolve } from "rsvp";

// Dummy session used by acceptance tests
export default Service.extend({
  setup() {
    return resolve();
  }
});
