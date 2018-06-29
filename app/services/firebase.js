import Service, { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

import config from 'fakturama/config/environment';

const {
  APP: {
    FIREBASE: { databaseURL }
  }
} = config;

export default Service.extend({
  session: service(),

  url: databaseURL,
  userId: readOnly('session.currentUser.uid'),
  token: readOnly('session.currentUser.authToken')
});
