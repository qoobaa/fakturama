import DS from 'ember-data';

const { RESTSerializer } = DS;

export default RESTSerializer.extend({
  serializeIntoHash(data, type, record, options) {
    Object.assign(data, this.serialize(record, options));
  }
});
