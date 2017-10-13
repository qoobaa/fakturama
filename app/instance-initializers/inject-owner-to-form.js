import Ember from 'ember';
import Form from 'fakturama/mixins/form';

// Dirty hack to get owner symbol
const OWNER = (function() {
  let finder = {};
  Ember.setOwner(finder, 'owner');
  return Object.keys(finder)[0];
})();

export function initialize(appInstance) {
  Form.reopen({
    [OWNER]: appInstance
  });
}

export default {
  initialize
};
