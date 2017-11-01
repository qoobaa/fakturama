import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'a',

  classNames: ['btn', 'btn-default', 'btn-upload'],

  reset() {

  },

  actions: {
    fileChange(event) {
      let fileReader = new window.FileReader();
      if (event.target.files.length) {
        fileReader.onload = (event) => {
          this.get('import')(event.target.result);
          this.reset();
        };
        fileReader.readAsText(event.target.files[0]);
      }
    }
  }
});
