define(function(require) {

  var Backbone = require("backbone");  
  var Utils = require("utils");
  
  var Information = require("models/Information");
  var UserInformationSet = require("collections/UserInformationSet");
  var ProfileInformationSet = require("collections/ProfileInformationSet");

  var ProfileCompletionView = Utils.Page.extend({

    constructorName: "ProfileCompletionView",
    model: Information,
    structure: null,

    initialize: function() {      
      this.template = Utils.templates.profilecompletion;
    },

    id: "profile-information-list",
    className: "i-g page view",

    events: {
    },

    render: function() {
      var informationSet = new Array();
      // prepare the rendering of results from profile manager REST service
      // active:true if user has selected information associated to his profile
      // active:false viceversa.
      for (var i = 0; i < this.model.get("profileInformationSet").length; i++) { 
        var information = new Information();
        var profileInformation = this.model.get("profileInformationSet").at(i);
        information.set({"id": profileInformation.get("id"), "description" : profileInformation.get("description") });
        for (var j = 0; j < this.model.get("userInformationSet").length; j++) {
          var userInformation = this.model.get("userInformationSet").at(j);
          if (profileInformation.get("id") == userInformation.get("id")) {
            information.set({"active": true});
            break;
          }
        }
        // populate the resulted informationSet
        informationSet.push(information);
      }

      this.$el.html(this.template({"informationSet": informationSet}));

      // change icons and text in navigation bar
      this.structure.$('.title').text('Profile Information');
      this.structure.$('.left-icon').css('visibility','visible');
      this.structure.$('.right-icon').css('visibility','visible');

      return this;
    },

  });

  return ProfileCompletionView;

});