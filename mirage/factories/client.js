import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  companyName() {
    return faker.company.companyName();
  },
  address() {
    return `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.country()}`;
  },
  contactName() {
    return `${faker.name.firstName()} ${faker.name.lastName()}`;
  }
});
