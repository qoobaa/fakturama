import Ember from 'ember';

const { Controller, computed: { oneWay } } = Ember;

export default Controller.extend({
  errors: oneWay('content.errors'),

  actions: {
    saveRecord() {
      var controller = this;

      this.set("content.isSubmitted", true);

      this.get("content").save()
          .then(function () {
            controller.transitionToRoute("app.clients");
          });
    }
  }
});
