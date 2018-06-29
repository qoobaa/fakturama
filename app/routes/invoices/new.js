import { hash } from "rsvp";
// import { next } from "@ember/runloop";
import Route from "@ember/routing/route";
import InvoiceForm from "fakturama/forms/invoice";

export default Route.extend({
  model() {
    const store = this.get("store");

    return hash({
      model: store.createRecord("invoice"),
      currencies: store.findAll("currency"),
      taxRates: store.findAll("tax-rate"),
      languages: store.findAll("language"),
      units: store.findAll("unit"),
      settings: store.findRecord("settings", "default"),
      clients: store.findAll("client"),
      accounts: store.findAll("account"),
      invoices: this.modelFor("invoices")
    });
  },

  setupController(controller, models) {
    const currencyCode = models.currencies.get("firstObject.code");
    models.model.set("currencyCode", currencyCode);
    models.model = InvoiceForm.create({ model: models.model });
    controller.setProperties(models);
  },

  deactivate() {
    let controller = this.controllerFor(this.routeName);
    let model = controller.get("model");
    controller.set("model", null);
    model.delete();
  }
});
