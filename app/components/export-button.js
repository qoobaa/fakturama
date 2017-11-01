import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  tagName: 'a',

  attributeBindings: ['href', 'download'],

  classNames: ['btn btn-default'],

  firebase: service('firebase'),

  click() {
    const { url, userId, token } = this.get('firebase')
                                       .getProperties(['url', 'userId', 'token']);
    const date = new Date().toISOString().substr(0, 16).replace('T', '_');

    this.setProperties({
      href: `${url}/${userId}.json?auth=${token}`,
      download: `fakturama-export-${date}.json`
    });
  }
});
