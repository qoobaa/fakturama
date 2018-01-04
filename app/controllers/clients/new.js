import Controller from '@ember/controller';
import NewController from 'fakturama/mixins/new-controller';

export default Controller.extend(NewController, {
  transitionTo: 'clients'
});
