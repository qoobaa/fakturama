import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/' });

  this.route('clients', function () {
    this.route('new');
  });
  this.route('client', { path: 'client/:client_id' }, function () {
    this.route('edit');
  });

  this.route('accounts', function () {
    this.route('new');
  });
  this.route('account', { path: 'account/:account_id' }, function () {
    this.route('edit');
  });

  // this.resource('invoices', function () {
  //   this.route('new');
  //   this.resource('invoice', { path: '/:invoice_id' }, function () {
  //     this.route('show', { path: '/' });
  //     this.route('edit');
  //   });
  // });

  this.route('settings');
});

export default Router;
