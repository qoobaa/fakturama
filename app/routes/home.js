import Route from '@ember/routing/route';

export default Route.extend({
  showLayout: false,
  renderTemplate() {
    this.render('home', { outlet: 'no-layout' });
  }
});
