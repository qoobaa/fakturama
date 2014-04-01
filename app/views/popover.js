var Popover = Ember.View.extend({
    isDismissed: false,

    didInsertElement: function () {
        this.$().popover({
            content: this.get("content"),
            placement: "bottom",
            container: "body",
            html: true,
            trigger: "manual"
        });

        if (!this.get("isDismissed")) {
            this.$().popover("show");
        }
    },

    isDismissedDidChange: function () {
        if (this.get("isDismissed")) {
            this.$().popover("hide");
        }
    }.observes("isDismissed"),

    click: function () {
        this.set("isDismissed", true);
    },

    willDestroyElement: function () {
        this.$().popover("destroy");
    }
});

export default Popover;
