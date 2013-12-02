module.exports = {
    app: {
        options: {
            processName: function (name) {
                return name.replace(/^app\/scripts\/templates\//, "").replace(/\.hbs$/, "");
            }
        },
        files: {
            ".tmp/ember_handlebars/scripts/templates.js": ["app/scripts/templates/*.hbs"]
        }
    }
};
