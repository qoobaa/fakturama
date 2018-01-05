import { Promise as EmberPromise } from 'rsvp';
import EmberObject, { observer, computed } from '@ember/object';
import config from 'fakturama/config/environment';
import md5 from 'md5';

const { firebase } = window;
const firebaseApp = firebase.initializeApp(config.APP.FIREBASE);
const auth = firebaseApp.auth(config.APP.FIREBASE['projectId']);

let User = EmberObject.extend({
  isAnonymous: computed('provider', function () {
    return this.get('provider') === 'anonymous';
  }),

  emailMD5: computed('email', function () {
    return md5(this.getWithDefault('email', ''));
  }),

  gravatarURL: computed('emailMD5', function () {
    return `//www.gravatar.com/avatar/${this.get('emailMD5')}?d=mm`;
  }),

  name: computed('displayName', 'email', function () {
    return this.get('displayName') || this.get('email') || 'Gość';
  }),

  firebaseAuthTokenDidChange: observer('firebaseAuthToken', function () {
    this.get('firebase').set('token', this.get('firebaseAuthToken'));
  }).on('init'),

  uidDidChange: observer('uid', function () {
    this.get('firebase').set('userId', this.get('uid'));
  }).on('init'),

  auth(firebaseUser) {
    return firebaseUser.getIdToken().then((token) => {
      this.setProperties(Object.assign({}, this.constructor.blankProperties, {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        firebaseAuthToken: token,
        provider: firebaseUser.isAnonymous ? 'anonymous' : firebaseUser.providerId
      }));
    });
  },

  login(method) {
    return new EmberPromise((resolve, reject) => {
      if(method === 'anonymous') {
        auth.signInAnonymously().then((user) => resolve(user),
                                      (error) => reject(error));
      } else if(method === 'google') {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        auth.signInWithPopup(provider).then((result) => resolve(result.user),
                                            (error) => reject(error));
      }
    }).then((user) => {
      return this.auth(user).then(() => this);
    });
  },

  logout: function () {
    var model = this;

    return new EmberPromise(function (resolve, reject) {
      auth.signOut().then(() => resolve(),
                          (error) => reject(error));
    }).then(function() {
      return model.login('anonymous');
    });
  }
});

User.reopenClass({
  blankProperties: {
    displayName: null,
    email: null,
    firebaseAuthToken: null,
    md5_hash: null,
    provider: null,
    uid: null
  },

  fetch: function (firebaseService) {
    var model = this.create({ firebase: firebaseService });

    return new EmberPromise((resolve) => {
      auth.onAuthStateChanged(function(user) {
        resolve(user);
      });
    }).then((user) => {
      if (user) {
        return model.auth(user).then(() => model);
      } else {
        return model.login('anonymous');
      }
    });
  }
});

export default User;
