import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Controller.extend({
  session: service(),

  user: readOnly('session.currentUser'),

  isAlertDismissed: false,

  actions: {
    signIn: function(method) {
      const session = this.get('session');
      session.create(method).then(
        () => {
          this.clearCache();
          this.send('refresh');
        },
        error => alert(error.message)
      );
    },

    signOut: function() {
      const session = this.get('session');
      session.remove().then(() => {
        this.clearCache();
        this.transitionToRoute('home');
      });
    },

    dismissAlert: function() {
      this.set('isAlertDismissed', true);
    }
  },

  clearCache: function() {
    this.get('store').unloadAll();
  }
});
