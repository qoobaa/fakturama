var NumberField = Ember.TextField.extend({
    type: "number",
    attributeBindings: ["min", "max", "step"],

    number: function (key, number) {
        if (arguments.length > 1) {
            this.set("value", String(number));
        }

        return parseFloat(this.get("value"));
    }.property("value")
});

export default NumberField;
