var ExportButton = Ember.View.extend({
    tagName: "a",
    attributeBindings: ["href", "download"],

    click: function () {
        this.setProperties({
            href: "%@%@.json?auth=%@".fmt(window.ENV.FIREBASE_URL, window.ENV.FIREBASE_USER_ID, window.ENV.FIREBASE_AUTH_TOKEN),
            download: "faktura-eksport-%@.json".fmt(new Date().toISOString().substr(0, 16).replace("T", "_"))
        });
    }
});

export default ExportButton;
