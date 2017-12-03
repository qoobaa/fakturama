import { alias } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  model: alias("content"),
  isSubmitted: false,

  save: function () {
    var form = this,
      model = this.get("model");

    return this.validate().then(function () {
      model.setProperties(form.toJSON());
      return model.save();
    }, null);
  },

  delete() {
    return this.get('model').destroyRecord();
  },

  rollback() {
    return this.get('model').rollbackAttributes();
  },

  toJSON: function () {
    return this.getProperties(Object.keys(this.get('model').toJSON()));
  },

  addErrors: function (errors) {
    var form = this;

    Object.keys(errors || {}).forEach(function (property) {
      form.set("errors." + property, form.get("errors." + property).concat(errors[property]));
    });
  }
});
