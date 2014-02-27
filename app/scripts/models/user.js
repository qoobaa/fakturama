Faktura.User = Ember.Object.extend({
    gravatarURL: function () {
        return "//www.gravatar.com/avatar/" + this.get("md5_hash") + "?d=mm";
    }.property("md5_hash"),

    name: function () {
        return this.get("displayName") || this.get("email");
    }.property("displayName", "email")
});
