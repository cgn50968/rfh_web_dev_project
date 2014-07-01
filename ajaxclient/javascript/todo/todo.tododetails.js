// ----------------------
// Darstellung der Details
// ----------------------

$.widget("wiki.wikiDetails", {
	load: function(wikiUrl) {
	
		$.ajax({
		  url: wikiUrl,																	// URL als Übergabeparameter für Aufruf "/ordonr/4 service/todos/$id"
		  dataType: "json",
		  
		  success: function(wiki) {
		  
			this.element.find(".author").text(wiki.author);								// Übergabe der Attribute aus "todo" an <span> Element 
			this.element.find(".due_date").text(wiki.due_date);	
			this.element.find(".title").text(wiki.title);		
			this.element.find(".notes").text(wiki.notes);	

			alert("HTTP-Antowrt erhalten");
		  },
		  context: this																	// Referenzieren dieses Widgets
		});
	}
});