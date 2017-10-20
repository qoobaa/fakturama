import Ember from 'ember';

let { Route } = Ember;

export function initialize() {
  Route.reopen({
    // Show layout by default, can be opt-out in the route
    showLayout: true,
    setupController() {
      this._super(...arguments);
      this.controllerFor('application').set('showLayout', this.get('showLayout'));
    }
  });
}

export default {
  initialize
};
