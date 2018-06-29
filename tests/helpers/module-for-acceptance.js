import { module } from 'qunit';

import startApp from './start-app';
import destroyApp from './destroy-app';
import { setup as setupAuth, reset as resetAuth } from './auth';

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();
      setupAuth(this.application);

      if (options.beforeEach) {
        return options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      resetAuth();

      if (options.afterEach) {
        return options.afterEach
          .apply(this, arguments)
          .then(() => destroyApp(this.application));
      } else {
        destroyApp(this.application);
      }
    }
  });
}
