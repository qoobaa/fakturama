import Service from '@ember/service';
import config from "fakturama/config/environment";

export default Service.extend({
  url: config.APP.FIREBASE.databaseURL,
  userId: null,
  token: null
});
