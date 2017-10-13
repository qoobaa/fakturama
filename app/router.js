import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("home", { path: "/" });

  // this.resource("clients", function () {
  //   this.route("new");
  //   this.resource("client", { path: "/:client_id" }, function () {
  //     this.route("edit");
  //   });
  // });
  this.route("app", {}, function() {
    this.route("clients", {}, function() {
      this.route("new");
    });
  });

  // this.resource("accounts", function () {
  //   this.route("new");
  //   this.resource("account", { path: "/:account_id" }, function () {
  //     this.route("edit");
  //   });
  // });

  // this.resource("invoices", function () {
  //   this.route("new");
  //   this.resource("invoice", { path: "/:invoice_id" }, function () {
  //     this.route("show", { path: "/" });
  //     this.route("edit");
  //   });
  // });

  // this.resource("settings");
});

export default Router;
