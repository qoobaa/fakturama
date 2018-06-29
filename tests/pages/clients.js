import {
  attribute,
  create,
  clickable,
  collection,
  text,
  visitable
} from 'ember-cli-page-object';
import { reject } from "rsvp";

export default create({
  visit: visitable('/clients'),
  newClient: clickable('[data-test-new-client]'),
  showClient(id) {
    const client = this.client(id);
    if(client) {
      return client.visit();
    } else {
      reject(`Client ${id} not found`);
    }
  },
  clients: collection('[data-test-clients]', {
    id: attribute('data-test-client-id', 'div'),
    contactName: text('[data-test-client-contact-name]'),
    companyName: text('[data-test-client-company-name]'),
    visit: clickable('[data-test-client-visit]')
  }),
  client(id = null) {
    const clients = this.clients;
    if(id) {
      return clients.filter((c) => c.id === id).objectAt(0);
    } else {
      return clients.objectAt(clients.length - 1);
    }
  }
});
