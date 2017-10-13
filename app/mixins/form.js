import Ember from 'ember';

const { Mixin, computed } = Ember;

export default Mixin.create({
  model: computed.alias("content"),
  isSubmitted: false,

  save: function () {
    var form = this,
      model = this.get("model");

    return this.validate().then(function () {
      model.setProperties(form.toJSON());
      return model.save();
    }, null);
  },

  toJSON: function () {
    return this.getProperties(Object.keys(this.get("model").toJSON()));
  },

  addErrors: function (errors) {
    var form = this;

    Object.keys(errors || {}).forEach(function (property) {
      form.set("errors." + property, form.get("errors." + property).concat(errors[property]));
    });
  }
});
