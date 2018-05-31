import EmberObject, { computed } from '@ember/object';
import md5 from 'md5';

export default EmberObject.extend({
  emailMD5: computed('email', function () {
    return md5(this.getWithDefault('email', ''));
  }),

  gravatarURL: computed('emailMD5', function () {
    return `//www.gravatar.com/avatar/${this.get('emailMD5')}?d=mm`;
  }),

  name: computed('displayName', 'email', function () {
    return this.get('displayName') || this.get('email') || 'Gość';
  })
});
