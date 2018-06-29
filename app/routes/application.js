import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  showLayout: true,
  session: service(),

  beforeModel: function() {
    return this.get('session').setup();
  },

  actions: {
    refresh() {
      this.refresh();
    }
  }
});
