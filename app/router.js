var Router = Ember.Router.extend();

Router.map(function () {
    this.resource("clients");
    this.route("client.new");
    this.resource("client", { path: "/client/:client_id" }, function () {
        this.route("edit");
    });

    this.resource("invoices");
    this.route("invoice.new", { path: "/invoice/new" });
    this.resource("invoice", { path: "/invoice/:invoice_id" }, function () {
        this.route("edit");
    });

    this.resource("settings");
});

export default Router;
