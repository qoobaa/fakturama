module.exports = {
    html: {
        files: ["app/**/*.html"],
        tasks: ["lock", "copy:html", "unlock"]
    },
    ember_handlebars: {
        files: ["app/**/*.hbs"],
        tasks: ["lock", "ember_handlebars", "unlock"]
    },
    less: {
        files: ["app/**/*.less"],
        tasks: ["lock", "less", "unlock"]
    },
    javascript: {
        files: ["app/**/*.js"],
        tasks: ["lock", "copy:javascript", "unlock"]
    }
};
