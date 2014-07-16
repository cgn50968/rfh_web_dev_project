/* -------------------- */
/*  Widget: wikiSearch  */
/* -------------------- */
																							// widget - die Funktion muss extra in der index.html aufgerufen werden. - wie ein Konstruktor
$.widget("wiki.wikiSearch", {  																// Beginn des Javascritp Objekts (Widget - wikiListe) {

	/* ------------------ */
	/* Function: _create  */
	/* ------------------ */
	_create: function() {
	
		var that = this;			
		
		/* ------------------------------- */
		/*  Trigger: onSearchWikisClicked  */
		/* ------------------------------- */
		this.element.find(".searchwikis").click(function() {			// Aktiviert den Link auf dem Element
//DEBUG		
alert("wiki.wikisearch.js\n# .click");
//DEBUG			
			that._trigger("onSearchWikisClicked", null, event.data);		// Ausführen der Funktion onShowWikisClicked in wiki.application.js	
			return false;
		});		
	},
	
	
	
	/* ----------------- */
	/* Function: reload  */
	/* ----------------- */
	reload: function() {
	
		var that = this;			
		
		/* ------------------------------- */
		/*  Trigger: onSearchWikisClicked  */
		/* ------------------------------- */
		this.element.find("#search_name").val("");
		this.element.find(".searchwikis").click(function() {			// Aktiviert den Link auf dem Element
//DEBUG		
alert("wiki.wikisearch.js\n# .click");
//DEBUG			
			that._trigger("onSearchWikisClicked", null, event.data);		// Ausführen der Funktion onShowWikisClicked in wiki.application.js	
			return false;
		});	
	},
	
	
	
	/* ---------------------- */
	/* Function: searchWikis  */
	/* ---------------------- */
	searchWikis: function(searchname) {
		
		var wiki = {									
			postMethod: "search", 
			name: this.element.find("#search_name").val(),
			//name: "SQL",
		};
		
		$.ajax({
			type: "POST",																	
			url: "/wiki/service/wikis",													
			dataType: "json",
			data: wiki,
			//success: this._appendWikis,														
			context: this,
		});
	}
	
});

/*
		
*/