import Resolver from "ember/resolver";

var App = Ember.Application.extend({
    rootElement: "#app",
    modulePrefix: "fakturama",
    Resolver: Resolver["default"]
});

export default App;
