/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-polish-to-words',

  included() {
    this._super.included(...arguments);
    this.import('vendor/ember-polish-to-words/index.js');
    this.import('vendor/shims/polish-to-words.js');
  },

  treeForVendor() {
    return new Funnel(path.join(this.app.project.nodeModulesPath, 'polish-to-words'), {
      destDir: 'ember-polish-to-words',
      files: ['index.js']
    });
  }
};
