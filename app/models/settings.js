import DS from "ember-data";
import Ember from "ember";

const { Model, attr } = DS;
const { computed } = Ember;

let Settings = Model.extend({
  id: attr(),
  companyName: attr(),
  address: attr(),
  vatin: attr(),
  contactName: attr(),
  numerationTypeCode: attr(),
  dueDays: attr(),

  seller: computed("address", "companyName", "vatin", function () {
    var parts = [this.get("companyName"), this.get("address")];

    if (this.get("vatin")) {
      parts.push("NIP / VATIN: " + this.get("vatin"));
    }

    return parts.join("\n").trim();
  })
});

Settings.reopenClass({
  fetch: function (id) {
    if (!id) {
        id = "default";
    }
    return this._super.call(this, id);
  },

  find: function (id) {
    if (!id) {
        id = "default";
    }

    return this._super.call(this, id);
  },

  clearCache: function () {
    this._super.apply(this, arguments);
    this._findAllRecordArray = undefined;
  }
});

export default Settings;
