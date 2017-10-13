import ClientForm from "fakturama/forms/client";
import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return this.get("store").createRecord("client");
  },

  setupController(controller, model) {
    controller.set("model", ClientForm.create({ model: model }));
  }
});