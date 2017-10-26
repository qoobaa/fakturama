import EditController from 'fakturama/mixins/edit-controller';
import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend(EditController, {
  transitionTo: 'clients'
});
