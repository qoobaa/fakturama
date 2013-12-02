module.exports = {
    html: {
        files: ["app/**/*.html"],
        tasks: ["lock", "copy:html", "unlock"]
    },
    ember_handlebars: {
        files: ["app/**/*.hbs"],
        tasks: ["lock", "ember_handlebars", "unlock"]
    },
    recess: {
        files: ["app/**/*.less"],
        tasks: ["lock", "recess", "unlock"]
    },
    javascript: {
        files: ["app/**/*.js"],
        tasks: ["lock", "copy:javascript", "unlock"]
    }
};
