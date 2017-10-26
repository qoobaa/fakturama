import Ember from 'ember';
import NewController from 'fakturama/mixins/new-controller';

const { Controller } = Ember;

export default Controller.extend(NewController, {
  transitionTo: 'clients'
});
