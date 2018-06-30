import { typeOf } from '@ember/utils';
import Mixin from '@ember/object/mixin';
import { oneWay } from '@ember/object/computed';

export default Mixin.create({
  errors: oneWay('model.errors'),

  makeTransition() {
    let transitionTo = this.get('transitionTo');
    if (typeOf(transitionTo) == 'function') {
      transitionTo.call(this);
    } else {
      this.transitionToRoute(transitionTo);
    }
  },

  actions: {
    saveRecord: function() {
      let model = this.get('model');

      model.set('isSubmitted', true);
      model.save().then(() => this.makeTransition(), () => null);
    }
  }
});
