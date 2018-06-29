import { assert } from '@ember/debug';
import { RestSerializer } from 'ember-cli-mirage';

export default RestSerializer.extend({
  embed: true,
  root: false,

  normalize(payload) {
    const type = this.type;
    assert(type, 'type must be provided in the serializer');
    return RestSerializer.prototype.normalize.call(this, {
      [type]: {
        payload
      }
    });
  },

  serialize() {
    let json = RestSerializer.prototype.serialize.apply(this, arguments);
    if (json.id) {
      json.name = json.id;
    }
    if (Array.isArray(json)) {
      return json.reduce(function(memo, e) {
        memo[e.id] = e;
        return memo;
      }, {});
    } else {
      return json;
    }
  }
});
