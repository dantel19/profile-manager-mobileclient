define(function(require) {

	var Backbone = require("backbone");
	var Information = require("models/Information");

	var UserInformationSet = Backbone.Collection.extend({
		constructorName: "UserInformationSet",
		model: Information,

		urlBase: "user/information/list",
		
		initialize: function() {
		},
		
		url: function() {
			return this.urlBase;
		},

		//parse: function (response) {
        //return response.data;
    	//},
		
		sync: function(method, model, option) {
			// get user's email and password from local storage
			var email = localStorage.getItem('email').toString();
      		var password = localStorage.getItem('password').toString();
      		// encrypt login data in base64 for Basic Authentication
      		var authentication = btoa(email+":"+password);
			var result = null;
			switch (method) {
				case "read": {
					$.ajax({
					  async: false,
					  crossDomain: true,
					  url: "http://localhost:8080/profilemanager/rest/" + this.url(),
					  method: "GET",
					  contentType : 'application/json',
					  dataType: 'json',
					  headers: {
					    authorization: "Basic " + authentication
					  },
					  success: function (data){
						result = data;
					  }  
					});	
										
					// results parsing					
					for (var k = 0; k < result.length; k++) model.add(result[k]);
					
					break;
				}
				case "create": {					
					break;
				}
				case "update": {
					break;					
				}
				case "delete": {
					break;
				}
			}
		}
	});

	return UserInformationSet;
});