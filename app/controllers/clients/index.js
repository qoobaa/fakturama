import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  clients: computed('content', function() {
    return this.get('content').filterBy('isNew', false);
  }),
});
