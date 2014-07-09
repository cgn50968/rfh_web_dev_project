$.widget("wiki.getPage", {
	
	_create: function() {																	
		$.ajax({
			url: "/wiki/service/wikis",															
			dataType: "json",
			success: function(wikis) {
				alert(wikis[1]["pages"]);
				//return wikis[1]["pages"];
				
				var that = this;
				var wikiPages = this.element.find(".getpage").clone();//.removeClass(".getpage");
				wikiPages.find(".pages").text("test");
				this.element.append(wikiPages);
				
				//this._wikis = wikis
				//this.element.find("#pages").val(wikis[1]["pages"]);							
				//this._super();
			}			
			//context: this
		});
	}
}); 