// ----------------------
// Darstellung der Details
// ----------------------

$.widget("wiki.wikiDetails", {
	load: function(wikiUrl) {
//DEBUG
alert("wiki.details.js\n # load: wikiDetails");
//DEBUG
		$.ajax({
			url: wikiUrl,																	// URL als Übergabeparameter für Aufruf "/wiki/service/wikis/$id"
			dataType: "json",
		  
			success: function(wiki) {
		  
			/* --------------------------------- */
			/*  ui-state-error Klasse entfernen  */
			/* --------------------------------- */
			this.element.find("#title_field").removeClass("ui-state-error").focus();	
		
			/* ----------------------------------------------------------------------------------------------
			    Übergabe der Werte aus Array "wiki"	
				val() weist Eingabefeldern Werte zu.
				Bei Aufruf ohne Übergabeparameter werden die aktuellen Werte der Eingabefelder zurückgegeben.
		       ----------------------------------------------------------------------------------------------- */
			this.element.find("#author_field_details").val(wiki.author);		
			this.element.find("#title_field_details").val(wiki.title);							
			this.element.find("#creation_date_field_details").val(wiki.creation_date);			
			this.element.find("#expiration_date_field_details").val(wiki.expiration_date);
			this.element.find("#category_field_details").val(wiki.category);
			this.element.find("#notes_field_details").val(wiki.notes);	

//DEBUG
alert("wiki.details.js\n # GET: GetWikiCommand");
//DEBUG
		  },
		  context: this																	// Referenzieren dieses Widgets
		});
	}
});