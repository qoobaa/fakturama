import { Factory, faker } from "ember-cli-mirage";

export default Factory.extend({
  isAnonymous: false,
  uid(i) {
    return `uid-${i}`;
  },
  displayName() {
    return `${faker.name.firstName()} ${faker.name.lastName()}`;
  },
  email() {
    return `${this.displayName.underscore()}@example.com`;
  }
});
