import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  showLayout: false,
  renderTemplate() {
    this.render('home', { outlet: 'no-layout' });
  }
});
