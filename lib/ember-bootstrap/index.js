/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-bootstrap',

  included() {
    this._super.included(...arguments);
    this.import('vendor/ember-bootstrap/bootstrap.js');
  },

  treeForVendor() {
    return new Funnel(path.join(this.app.project.nodeModulesPath, 'bootstrap', 'dist', 'js'), {
      destDir: 'ember-bootstrap',
      files: ['bootstrap.js']
    });
  }
};
