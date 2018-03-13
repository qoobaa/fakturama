/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'fakturama',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.APP.FIREBASE = {
      apiKey: "AIzaSyCoxVMOvGe1l07rMvsAZNPg0Kqt8kV5zd8",
      authDomain: "fakturama-e87a7.firebaseapp.com",
      databaseURL: "https://fakturama-e87a7.firebaseio.com",
      projectId: "fakturama-e87a7",
      storageBucket: "fakturama-e87a7.appspot.com",
      messagingSenderId: "690318607516"
    };
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    ENV.APP.FIREBASE = {
      apiKey: "AIzaSyA4RCBawIoEoNs2W9oI7WY2S8OMwJra7xg",
      authDomain: "fakturama-test.firebaseapp.com",
      databaseURL: "https://fakturama-test.firebaseio.com",
      projectId: "fakturama-test",
      storageBucket: "fakturama-test.appspot.com",
      messagingSenderId: "690318607516"
    };
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'staging') {
    ENV.APP.FIREBASE = {
      apiKey: "AIzaSyDP6rWEbwd3F8Kd-2q97a24Nqm6DmQbuLQ",
      authDomain: "fakturama-staging.firebaseapp.com",
      databaseURL: "https://fakturama-staging.firebaseio.com",
      projectId: "fakturama-staging",
      storageBucket: "fakturama-staging.appspot.com",
      messagingSenderId: "230102749631"
    };
  }

  if (environment === 'production') {
    ENV.APP.FIREBASE = {
      apiKey: "AIzaSyD85qng9z1z7e2SvGGmvdHbrdsR9t1NCz0",
      authDomain: "fakturama.firebaseapp.com",
      databaseURL: "https://fakturama.firebaseio.com",
      projectId: "firebase-fakturama",
      storageBucket: "firebase-fakturama.appspot.com",
      messagingSenderId: "709741585144"
    };
  }

  return ENV;
};
