$.widget("wiki.getPage", {

	options: {
		autoOpen: false,		
		modal: true,			
	},
	
	_create: function() {																	
		$.ajax({
			url: "/wiki/service/wikis",															
			dataType: "json",
			success: function(wikis) {
				alert(wikis[1]["pages"]);
				return wikis[1]["pages"];
			},			
		});
	}
}); 