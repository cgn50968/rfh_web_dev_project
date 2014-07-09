$.widget("wiki.getPage", {
	
	_create: function() {																	
		$.ajax({
			url: "/wiki/service/wikis",															
			dataType: "json",
			success: function(wikis) {
				alert(wikis[1]["pages"]);
				}
		});
	}
}); 