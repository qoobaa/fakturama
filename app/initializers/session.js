import Ember from 'ember';
import CurrentSession from 'fakturama/services/current-session';
import DummySession from 'fakturama/services/dummy-session';

export function initialize(application) {
  const sessionService = Ember.testing ? DummySession : CurrentSession;
  application.register('service:session', sessionService);
}

export default {
  name: 'session',
  initialize
};
