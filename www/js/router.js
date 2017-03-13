define(function(require) {

  var $ = require("jquery");
  var Backbone = require("backbone");
  // Models
  var Information = require("models/Information");
  var ProfileInformation = require("models/ProfileInformation");
  // Collections
  var UserInformationSet = require("collections/UserInformationSet");
  var ProfileInformationSet = require("collections/ProfileInformationSet");
  // Views
  var StructureView = require("views/StructureView");
  var LoginView = require("views/pages/LoginView");
  var ProfileCompletionView = require("views/pages/ProfileCompletionView");
  
  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "profileCompletionView": "profileCompletionView",
      "loginview": "loginView"
    },

    firstView: "loginview",

    initialize: function(options) {
      this.currentView = undefined;
    },

    profileCompletionView: function() {
      var profileModel = new ProfileInformationSet();
      var userModel = new UserInformationSet();
      profileModel.fetch();
      userModel.fetch();
      
      // create super model that contain profileModel and userModel
      var model = new Backbone.Model();
      model.set({userInformationSet: userModel, profileInformationSet: profileModel});
      
      // create the view
      var page = new ProfileCompletionView({model:model});
      page.structure = this.structureView; // Mi porto un riferimento alla Struttura  
      // show the view
      this.changePage(page);
    },

    loginView: function() {
      // create the view and show it
      var page = new LoginView();
      page.structure = this.structureView; // I carry a reference to the structure  
      this.changePage(page);
    },

    // load the structure view
    showStructure: function() {
      // disable the Backbone.sync
      Backbone.sync = function(method, model, options) {};

      if (!this.structureView) {
        this.structureView = new StructureView();
        // put the el element of the structure view into the DOM
        document.body.appendChild(this.structureView.render().el);
        this.structureView.trigger("inTheDOM");
      }
      // go to first view
      this.navigate(this.firstView, {trigger: true});
    },

  });

  return AppRouter;

});