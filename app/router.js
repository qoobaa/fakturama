var Router = Ember.Router.extend();

Router.map(function () {
    this.resource("clients", function () {
        this.route("new");
        this.resource("client", { path: ":client_id" });
    });
    this.resource("invoices", function () {
        this.route("new");
        this.resource("invoice", { path: ":invoice_id" });
    });
    this.resource("settings");
});

export default Router;
