import Mixin from '@ember/object/mixin';
import { oneWay } from '@ember/object/computed';

export default Mixin.create({
  errors: oneWay('model.errors'),

  actions: {
    saveRecord: function () {
      let model = this.get('model');
      const transitionTo = this.get('transitionTo');

      model.set('isSubmitted', true);
      model.save().then(() => this.transitionToRoute(transitionTo));
    }
  }
});
