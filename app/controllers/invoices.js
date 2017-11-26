import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  sortProperties: ['issueDate', 'number'],
  sortAscending: true
});
