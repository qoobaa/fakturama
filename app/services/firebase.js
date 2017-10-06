import config from "fakturama/config/environment";
import Ember from 'ember';

const { Service } = Ember;

export default Service.extend({
  url: config.APP.FIREBASE.databaseURL,
  userId: null,
  token: null
});
