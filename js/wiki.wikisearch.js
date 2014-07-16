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
	gotoWikiSearchResult: function() {
		
		var wiki = {									
			postMethod: "search", 
			name: this.element.find("#search_name").val(),					// Suchbegriff
		};

//DEBUG		
alert("wiki.wikisearch.js\n# gotoWikiSearchResult");
//DEBUG	

		$("#wiki_list").wikiList("searchWikisList", wiki);					// Aufruf: Suche in wikiList
		
	},
	
});