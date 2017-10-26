import Ember from 'ember';

const { Mixin, computed: { oneWay } } = Ember;

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
