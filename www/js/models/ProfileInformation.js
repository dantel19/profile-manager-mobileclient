define(function(require) {

	var Backbone = require("backbone");

	var ProfileInformation = Backbone.Model.extend({
		constructorName: "ProfileInformation",
		defaults: {
			id_profile: 0,
			id_information: 0,
			rank: 0.0
		},
		
		initialize: function() {
			// unset the profileInformationSet we don't need it
			this.set("profileInformationSet", null);
		},

		// Override toJSON method
		toJSON : function() {
        return {
            id_profile: this.get('id_profile'),
            id_information: this.get('id_information'),
            rank: this.get('rank'),
        	};
    	}
		
	});

	return ProfileInformation;
});