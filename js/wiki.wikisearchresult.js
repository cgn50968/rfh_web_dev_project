/* -------------------------- */
/*  Widget: wikiSearchResult  */
/* -------------------------- */
																						
$.widget("wiki.wikiSearchResult", {  																
	
		
	searchWikis: function(wiki) {
		
		$.ajax({
			type: "POST",																	
			url: "/wiki/service/wikis",													
			dataType: "json",
			data: wiki,
			success: this._test,
			context: this,
		});
	},
	

	
	_test: function(wikis) {
		
		var that = this;
		
		for(var i = 0; i < wikis.length; i++) {
		var wiki = wikis[i];
			alert(wiki.category);
		
		}
	}
	
});