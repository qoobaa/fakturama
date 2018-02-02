import { typeOf } from '@ember/utils';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  makeTransition() {
    let transitionTo = this.get('transitionTo');
    if(typeOf(transitionTo) == 'function') {
      transitionTo.call(this);
    } else {
      this.transitionToRoute(transitionTo);
    }
  },
  actions: {
    saveRecord: function () {
      let model = this.get('model');

      model.set('isSubmitted', true);
      model.save().then(() => this.makeTransition(),
                        () => null);
    },

    deleteRecord: function () {
      let model = this.get('model');

      model.delete().then(() => this.makeTransition());
    }
  }
});
