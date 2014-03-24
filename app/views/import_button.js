var ImportButton = Ember.View.extend({
    tagName: "a",

    didInsertElement: function () {
        $("<input>").attr("type", "file").appendTo(this.$());
    },

    change: function (event) {
        var fileReader = new FileReader();

        fileReader.onload = function (event) {
            $.ajax("%@%@/.json?auth=%@".fmt(window.ENV.FIREBASE_URL, window.ENV.FIREBASE_USER_ID, window.ENV.FIREBASE_AUTH_TOKEN), {
                type: "PUT",
                data: event.target.result
            });
        };

        fileReader.readAsText(event.target.files[0]);
    }
});

export default ImportButton;
