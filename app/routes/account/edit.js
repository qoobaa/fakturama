import Route from "@ember/routing/route";
import AccountForm from "fakturama/forms/account";

export default Route.extend({
  model: function() {
    return this.modelFor("account");
  },

  setupController(controller, model) {
    controller.set("model", AccountForm.create({ model: model }));
  },

  deactivate() {
    let controller = this.controllerFor(this.routeName);
    controller.set("model", null);
  }
});
