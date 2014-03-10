var ClientPresenter = Ember.ObjectProxy.extend({
    model: Ember.computed.alias("content")
});

export default ClientPresenter;
