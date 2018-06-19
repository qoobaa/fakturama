import EmberObject from "@ember/object";

import config from "fakturama/config/environment";

const {
  APP: {
    FIREBASE,
    FIREBASE: { projectId }
  }
} = config;
const { firebase } = window;
const app = firebase.initializeApp(FIREBASE);

function delegateMethod(name) {
  return function() {
    return this.get("content")[name](...arguments);
  };
}

export default EmberObject.extend({
  init() {
    this._super(...arguments);
    this.set("content", app.auth(projectId));
    this.set("googleProvider", new firebase.auth.GoogleAuthProvider());
  },

  onAuthStateChanged: delegateMethod("onAuthStateChanged"),
  signInAnonymously: delegateMethod("signInAnonymously"),
  signInWithGoogle() {
    const content = this.get("content");
    const provider = this.get("googleProvider");
    provider.addScope("email");
    provider.addScope("profile");
    return content.signInWithPopup(provider);
  },
  signOut: delegateMethod("signOut")
});
