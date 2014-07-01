// ----------------------
// Darstellung der Details
// ----------------------

$.widget("wiki.wikiDetails", {
	load: function(wikiUrl) {
	
		$.ajax({
		  url: wikiUrl,																	// URL als Übergabeparameter für Aufruf "/rfh_web_dev_project/service/wikis/$id"
		  dataType: "json",
		  
		  success: function(wiki) {
		  
			this.element.find(".author").text(wiki.author);								// Übergabe der Attribute aus "wiki" an <span> Element 
			this.element.find(".category").text(wiki.category);	
			this.element.find(".creation_date").text(wiki.creation_date);	
			this.element.find(".expiration_date").text(wiki.expiration_date);	
			this.element.find(".title").text(wiki.title);		
			this.element.find(".notes").text(wiki.notes);	

			alert("HTTP-Antowrt erhalten");
		  },
		  context: this																	// Referenzieren dieses Widgets
		});
	}
});