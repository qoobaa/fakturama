import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  accounts: computed('content.[]', function() {
    return this.get('content').filterBy('isNew', false);
  }),
});
