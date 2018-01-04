import Controller from '@ember/controller';
import EditController from 'fakturama/mixins/edit-controller';

export default Controller.extend(EditController, {
  transitionTo: 'accounts'
});
