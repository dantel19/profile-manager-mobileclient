define(function(require) {

	var Backbone = require("backbone");

	var Information = Backbone.Model.extend({
		constructorName: "Information",
		defaults: {
			id: 0,
			description: "",
			profileInformationSet: [],
			active: false,
		},
		
		initialize: function() {
			// unset the profileInformationSet we don't need it
			this.set("profileInformationSet", null);
		},

		// Override toJSON method
		toJSON : function() {
        return {
            id: this.get('id'),
            description: this.get('description'),
            active: this.get('active'),
        	};
    	}
		
	});

	return Information;
});