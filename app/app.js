import Resolver from "ember/resolver";

var App = Ember.Application.extend({
    rootElement: "#app",
    modulePrefix: "faktura",
    Resolver: Resolver["default"]
});

export default App;
