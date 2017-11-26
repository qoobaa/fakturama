import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  invoices: computed('content', function() {
    return this.get('content').filterBy('isNew', false);
  }),
});
