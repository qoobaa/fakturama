import Controller from '@ember/controller';
import { oneWay } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({
  firebase: service('firebase'),

  numerationTypes: null,

  isDeleteModalVisible: false,

  errors: oneWay('model.errors'),

  clearCache() {
    this.get('store').unloadAll();
  },

  actions: {
    save: function () {
      let model = this.get('model');
      model.set('isSubmitted', true);
      model.save().then(() => this.transitionToRoute('index'));
    },

    showDeleteModal: function () {
      this.set('isDeleteModalVisible', true);
    },

    dismissDeleteModal: function () {
      this.set('isDeleteModalVisible', false);
    },

    importDatabase(data) {
      const { url, userId, token } = this.get('firebase')
                                         .getProperties(['url', 'userId', 'token']);
      const uri = `${url}/${userId}.json?auth=${token}`;

      $.ajax(uri, { type: 'PUT', data: data })
        .done(() => {
          this.clearCache();
          this.transitionToRoute("invoices");
        });
    },

    deleteDatabase() {
      const { url, userId, token } = this.get('firebase')
                                         .getProperties(['url', 'userId', 'token']);
      const uri = `${url}/${userId}.json?auth=${token}`;

      $.ajax(uri, { type: "DELETE" })
        .done(() => {
          this.clearCache();
          this.transitionToRoute("invoices");
        });
    }
  }
});
