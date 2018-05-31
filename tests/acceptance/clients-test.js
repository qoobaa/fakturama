import { test } from "qunit";
import moduleForAcceptance from "fakturama/tests/helpers/module-for-acceptance";
import clientsPage from "fakturama/tests/pages/clients";
import newClientPage from "fakturama/tests/pages/new-client";
import { authenticate } from "fakturama/tests/helpers/auth";

moduleForAcceptance("Acceptance | clients", {
  beforeEach() {
    const user = server.create("user");
    authenticate(this, user, "token");
  }
});

test("creating a new client", function(assert) {
  clientsPage.visit().newClient();

  andThen(function() {
    const attrs = {
      companyName: "Simpsons LLC",
      address: "Springfield",
      contactName: "Bart Simpson"
    };
    newClientPage.saveWith(attrs);

    andThen(function() {
      const client = clientsPage.client();
      assert.equal(client.contactName, attrs.contactName);
      assert.equal(client.companyName, attrs.companyName);
    });
  });
});

test("editing a client", function(assert) {
  const client = server.create('client');
  clientsPage.visit();

  andThen(function() {
    clientsPage.showClient(client.id);

    andThen(function() {
      const attrs = Object.assign({}, client, {
        companyName: "Simpsons LLC",
        address: "Springfield",
        contactName: "Bart Simpson"
      });
      newClientPage.saveWith(attrs);

      andThen(function() {
        const client = clientsPage.client();
        assert.equal(client.contactName, attrs.contactName);
        assert.equal(client.companyName, attrs.companyName);
      });
    });
  });
});

test("removing a client", function(assert) {
  const client = server.create('client');
  clientsPage.visit();

  andThen(function() {
    clientsPage.showClient(client.id);

    andThen(function() {
      newClientPage.delete();

      andThen(function() {
        const clients = clientsPage.clients;
        assert.equal(clients.length, 0);
      });
    });
  })
});

