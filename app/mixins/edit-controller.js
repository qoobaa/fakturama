import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    saveRecord: function () {
      let model = this.get('model');
      const transitionTo = this.get('transitionTo');

      model.set('isSubmitted', true);
      model.save().then(() => this.transitionToRoute(transitionTo));
    },

    deleteRecord: function () {
      let model = this.get('model');
      const transitionTo = this.get('transitionTo');

      model.delete().then(() => this.transitionToRoute(transitionTo));
    }
  }
});
