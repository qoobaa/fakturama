import User from "fakturama/models/user";

let application = null;

export function setup(app) {
  application = app;
}

export function reset() {
  let session = application.__container__.lookup("service:session");
  session.set("currentUser", null);
}

export function authenticate(user, token) {
  let session = application.__container__.lookup("service:session");
  session.set("currentUser", User.create({
    uid: user.uid,
    authToken: token,
    email: user.email,
    displayName: user.displayName,
    isAnonymous: user.isAnonymous
  }));
}
