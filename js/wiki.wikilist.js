/* ------------------ */
/*  Widget: wikiList  */
/* ------------------ */																		// widget - die Funktion muss extra in der index.html aufgerufen werden. - wie ein Konstruktor
$.widget("wiki.wikiList", {  																	// Beginn des Javascritp Objekts (Widget - wikiListe) {

	/* ------------------ */
	/* Function: _create  */
	/* ------------------ */
	_create: function() {																		//Instanzieren der Methode des Objekts
	
		/* ----------------------------- */
		/*  Paramenter für POST Methode  */
		/* ----------------------------- */
		
		var limitStart = 0;																		// LIMIt: Ausgangsstartpunkt		
		var limitResults = 8;																	// LIMIT: Anzahl der angezeigten Datensätze
		
		var wiki = {									
			postMethod: "get", 
			pageFrom: limitStart,
			pageResults: limitResults,
		};
			

		/* -------------- */
		/*  HTML Anfrage  */
		/* -------------- */
		$.ajax({
			type: "POST",																		// für RequestHandler - Entscheidung
			url: "/wiki/service/wikis",															// Aufruf der JSON Webseite und Übergabe der Rückgabe an das Array (wikis) (aus WikiService.php)
			dataType: "json",
			data: wiki,
			success: this._appendWikis,															// nur HTML Code 200 zurückkommt.
			context: this,
		});
	},

	
	
	/* ------------------ */
	/*  Function: reload  */
	/* ------------------ */	
	reload: function(pagenumber) {
	
		/* ----------------------------- */
		/*  Paramenter für POST Methode  */
		/* ----------------------------- */		
        if (pagenumber > 0) {
			var limitStart = pagenumber * 8 - 8;												// LIMIT: Startpunkt
		}
		else {
			var limitStart = 0;																	// LIMIt: Ausgangsstartpunkt
		};
		
		var limitResults = 8;																	// LIMIT: Anzahl der angezeigten Datensätze
		
		var wiki = {									
			postMethod: "get", 
			pageFrom: limitStart,
			pageResults: limitResults,
		};

		
		this.element.find(".wiki:not(.template)").remove();										// löschen des HTML-Elements (class) .wiki (NICHT (class) .template)

		/* -------------- */
		/*  HTML Anfrage  */
		/* -------------- */
		$.ajax({
			type: "POST",																		// für RequestHandler - Entscheidung
			url: "/wiki/service/wikis",															// Aufruf der JSON Webseite und Übergabe der Rückgabe an das Array (wikis) (aus WikiService.php)
			dataType: "json",
			data: wiki,
			success: this._appendWikis,															// nur HTML Code 200 zurückkommt.
			context: this,
		});		
	},    

	
	
	/* -------------------------- */
	/* Function: searchWikisList  */
	/* -------------------------- */
	searchWikisList: function(wiki) {
		
		this.element.find(".wiki:not(.template)").remove();										// alte Liste entfernen
		
		$.ajax({
			type: "POST",																	
			url: "/wiki/service/wikis",													
			dataType: "json",
			data: wiki,
			success: this._appendWikis,
			context: this,
		});
	},

	
	
	/* ----------------------- */
	/* Function: _appendWikis  */
	/* ----------------------- */
	_appendWikis: function(wikis) {
		
		var that = this;

		for(var i = 0; i < wikis.length; i++) {
			var wiki = wikis[i];
			
			var wikiElement = this.element.find(".template").clone().removeClass("template");	// Finde HTML Element "template" und kopiere es, anschließend entferne HTML Klasse "template"	

			/* --------------------------- */
			/*  Datenübergabe an Template  */
			/* --------------------------- */			
			wikiElement.find(".author").text(wiki.author);										// Wiedergabe über eigene Funktion... siehe Unterlagen
			wikiElement.find(".category").text(wiki.category);	
			wikiElement.find(".creation_date").text(wiki.creation_date);	
			wikiElement.find(".days_to_go").text(wiki.days_to_go);			
			wikiElement.find(".title").text(wiki.title);		
			wikiElement.find(".notes").text(wiki.notes);	
			
			
			/* ------------------------ */
			/*  Trigger: onWikiClicked  */
			/* ------------------------ */
			wikiElement.click(wiki.url, function(event) {										// Click Ereignis (wiki.url = Übergabe der URL
				that._trigger("onWikiClicked", null, event.data);								// Übergabe der URL mit korrekter ID des Datensatzes
			});

			
			/* ------------------------------ */
			/*  Trigger: onDeleteWikiClicked  */
			/* ------------------------------ */
			wikiElement.find(".delete_wiki").click(wiki, function(event) {
				that._trigger("onDeleteWikiClicked", null, event.data);						
				return false;																	// Keine weitere Bearbeitung durch False
			});
				
				
			/* ---------------------------- */
			/*  Trigger: onEditWikiClicked  */
			/* ---------------------------- */
			wikiElement.find(".edit_wiki").click(wiki, function(event) {
				that._trigger("onEditWikiClicked", null, event.data);						
				return false;																	// Keine weitere Bearbeitung durch False
			});		
			this.element.append(wikiElement);
		}
	},
});		
