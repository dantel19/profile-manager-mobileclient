define(function(require) {

  var Backbone = require("backbone");
  var Utils = require("utils");

  var LoginView = Utils.Page.extend({

    constructorName: "LoginView",
    structure: null,

    id: "login-form",
    className: "content-padded",

    events: {
      "click #login": "login",
      "tap #login": "login",
    },

    initialize: function(options) {
      this.template = Utils.templates.loginview;
    },

    render: function() {
      this.$el.html(this.template());

      // change icons and text in navigation bar
      this.structure.$('.title').text('ProfileManager');
      this.structure.$('.left-icon').css('visibility','hidden');
      this.structure.$('.right-icon').css('visibility','hidden');

      return this;
    },

    login: function(e) {
      var email = this.$('#email').val();
      var password = this.$('#password').val();        
      // save user email and password in LocalStorage
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      // navigate to profile completion view after login
      Backbone.history.navigate("profileCompletionView", { trigger: true });
    }
    
  });

  return LoginView;

});