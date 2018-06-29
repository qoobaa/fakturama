import EmberObject from "@ember/object";
import { resolve } from "rsvp";
import { moduleFor, test } from "ember-qunit";

moduleFor("service:current-session", "Unit | Service | session");

test("it creates a service with authClass", function(assert) {
  assert.expect(2);
  const authClass = EmberObject.extend({
    init() {
      this._super(...arguments);
      assert.ok(this, "authClass#create called");
    }
  });
  let service = this.subject({ authClass });

  assert.ok(service);
});

test("it creates a new session with provided method", function(assert) {
  assert.expect(2);
  const authClass = EmberObject.extend({
    signInAnonymously() {
      assert.ok(this, "authClass#signInAnonymously called");
      return resolve(true);
    },
    signInWithGoogle() {
      assert.ok(this, "authClass#signInWithGoogle called");
      return resolve(true);
    }
  });

  let service = this.subject({ authClass });
  service.create();
  service.create("google");
});

test("it removes a session and then create an anonymous one", function(assert) {
  assert.expect(2);
  const authClass = EmberObject.extend({
    signInAnonymously() {
      assert.ok(this, "authClass#signInAnonymously called");
      return resolve();
    },
    signOut() {
      assert.ok("authClass#signOut called");
      return resolve();
    }
  });

  let service = this.subject({ authClass });
  service.remove();
});

test("it setup a session", function(assert) {
  assert.expect(2);
  const user = EmberObject.create({
    getIdToken() {
      return resolve("token");
    }
  });
  const authClass = EmberObject.extend({
    onAuthStateChanged(callback) {
      callback(user);
    }
  });

  let service = this.subject({ authClass });
  return service.setup().then(() => {
    const currentUser = service.get("currentUser");
    assert.ok(currentUser);
    assert.equal(currentUser.get("authToken"), "token");
  });
});
