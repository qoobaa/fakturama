import Ember from 'ember';

const { Controller, computed: { oneWay } } = Ember;

export default Controller.extend({
  errors: oneWay('model.errors'),

  actions: {
    saveRecord() {
      let model = this.get('model');

      model.set('isSubmitted', true);
      model.save().then(() => this.transitionToRoute('clients'),
                        () => model.set('isSubmitted', false));
    }
  }
});
