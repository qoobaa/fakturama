import Ember from 'ember';

const { Controller, computed: { oneWay } } = Ember;

export default Controller.extend({
  errors: oneWay('model.errors'),

  actions: {
    saveRecord: function () {
      let model = this.get('model');

      model.set('isSubmitted', true);
      model.save().then(() => this.transitionToRoute('accounts'));
    }
  }
});
