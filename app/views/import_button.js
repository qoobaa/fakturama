var ImportButton = Ember.View.extend(Ember.ViewTargetActionSupport, {
    tagName: "a",

    didInsertElement: function () {
        $("<input>").attr("type", "file").appendTo(this.$());
    },

    reset: function () {
        this.$().wrap("<form>");
        this.$().get(0).parentNode.reset();
        this.$().unwrap("<form>");
    },

    change: function (event) {
        var view = this,
            fileReader = new window.FileReader();

        if (event.target.files.length) {
            fileReader.onload = function (event) {
                view.triggerAction({ actionContext: event.target.result });
                view.reset();
            };

            fileReader.readAsText(event.target.files[0]);
        }
    }
});

export default ImportButton;
