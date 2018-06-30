import $ from 'jquery';
import Controller, { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Controller.extend({
  application: controller(),

  firebase: service('firebase'),

  numerationTypes: null,

  isDeleteModalVisible: false,

  errors: readOnly('model.errors'),

  actions: {
    save: function() {
      let model = this.get('model');
      model.set('isSubmitted', true);
      model.save().then(() => this.transitionToRoute('invoices.index'));
    },

    showDeleteModal: function() {
      this.set('isDeleteModalVisible', true);
    },

    dismissDeleteModal: function() {
      this.set('isDeleteModalVisible', false);
    },

    importDatabase(data) {
      const { url, userId, token } = this.get('firebase').getProperties([
        'url',
        'userId',
        'token'
      ]);
      const uri = `${url}/${userId}.json?auth=${token}`;

      $.ajax(uri, { type: 'PUT', data: data }).done(() => {
        this.get('application').clearCache();
        this.transitionToRoute('invoices');
      });
    },

    deleteDatabase() {
      const { url, userId, token } = this.get('firebase').getProperties([
        'url',
        'userId',
        'token'
      ]);
      const uri = `${url}/${userId}.json?auth=${token}`;

      $.ajax(uri, { type: 'DELETE' }).done(() => {
        this.get('application').clearCache();
        this.transitionToRoute('invoices');
      });
    }
  }
});
