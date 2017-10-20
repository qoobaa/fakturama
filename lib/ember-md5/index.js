/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-md5',

  included() {
    this._super.included(...arguments);
    this.import('vendor/ember-md5/md5.js');
    this.import('vendor/shims/md5.js');
  },

  treeForVendor(tree) {
    return new Funnel(path.join(this.app.project.nodeModulesPath, 'blueimp-md5', 'js'), {
      destDir: 'ember-md5',
      files: ['md5.js']
    });
  }
};
