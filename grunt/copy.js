module.exports = {
    html: {
        files: [{
            expand: true,
            cwd: "app",
            src: ["**/*.html"],
            dest: "dist"
        }]
    },
    javascript: {
        files: [{
            expand: true,
            cwd: "app",
            src: ["**/*.js"],
            dest: ".tmp"
        }]
    }
};
