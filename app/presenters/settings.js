var SettingsPresenter = Ember.ObjectProxy.extend({
    model: Ember.computed.alias("content")
});

export default SettingsPresenter;
