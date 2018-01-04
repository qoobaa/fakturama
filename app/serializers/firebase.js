import DS from "ember-data";

export default DS.RESTSerializer.extend({
  serializeIntoHash(data, type, record, options) {
    Object.assign(data, this.serialize(record, options));
  }
});
