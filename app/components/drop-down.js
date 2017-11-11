import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'select',

  attributeBindings: ['id'],

  classNames: ['form-control'],

  change(event) {
    const value = event.target.value;
    this.get('onSelect')(value);
  },

  options: computed('model.@each', 'labelKey', 'valueKey', function() {
    const label = this.get('labelKey');
    const value = this.get('valueKey');
    return this.getWithDefault('model', []).map((item) => {
      return { value: item.get(value), label: item.get(label) };
    });
  })
});
