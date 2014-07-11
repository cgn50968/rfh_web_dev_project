/* ------------------ */
/*  Widget: wikiList  */
/* ------------------ */
																							// widget - die Funktion muss extra in der index.html aufgerufen werden. - wie ein Konstruktor
$.widget("wiki.wikiList", {  																// Beginn des Javascritp Objekts (Widget - wikiListe) {

	/* ------------------ */
	/* Function: _create  */
	/* ------------------ */
	_create: function() {																	//Instanzieren der Methode des Objekts
	
		/* ----------------------------- */
		/*  Paramenter für POST Methode  */
		/* ----------------------------- */
		
		var limitStart = 0;																	// LIMIt: Ausgangsstartpunkt		
		var limitResults = 5;																// LIMIT: Anzahl der angezeigten Datensätze
		
		var wiki = {									
			postMethod: "get", 
			pageFrom: limitStart,
			pageResults: limitResults,
		};
		
//DEBUG
alert("wiki.wikilist.js\n # _create: wikiList: _setPageList");
//DEBUG

		/* 1. HTML Anfrage - PageSize */
		$.ajax({
			url: "/wiki/service/wikis",				
			dataType: "json",
			success: this._setPageList,
			context: this,
		});

//DEBUG
alert("wiki.wikilist.js\n # _create: wikiList: _appendWikis");
//DEBUG
		
		/* 2. HTML Anfrage - Liste */
		$.ajax({
			type: "POST",																	// für RequestHandler - Entscheidung
			url: "/wiki/service/wikis",														// Aufruf der JSON Webseite und Übergabe der Rückgabe an das Array (wikis) (aus WikiService.php)
			dataType: "json",
			data: wiki,
			success: this._appendWikis,														// nur HTML Code 200 zurückkommt.
			context: this,
		});
		
	},

	
	
	/* ------------------ */
	/*  Function: reload  */
	/* ------------------ */	
	reload: function(pagenumber) {
	
//DEBUG
alert("wiki.wikilist.js\n # reload: wikiList");
//DEBUG		
		/* ----------------------------- */
		/*  Paramenter für POST Methode  */
		/* ----------------------------- */
		
        if (pagenumber > 0) {
			var limitStart = pagenumber * 5 - 5;										// LIMIT: Startpunkt
		}
		else {
			var limitStart = 0;															// LIMIt: Ausgangsstartpunkt
		};
		
		var limitResults = 5;															// LIMIT: Anzahl der angezeigten Datensätze
		
		var wiki = {									
			postMethod: "get", 
			pageFrom: limitStart,
			pageResults: limitResults,
		};

		this.element.find(".pages").remove();												// löschen des HTML-Elements (class) .pages		
		this.element.find(".wiki:not(.template)").remove();									// löschen des HTML-Elements (class) .wiki (NICHT (class) .template)

//DEBUG
alert("wiki.wikilist.js\n # _create: wikiList: _setPageList");
//DEBUG
		
		/* 1. HTML Anfrage - PageSize */
		$.ajax({
			url: "/wiki/service/wikis",															
			dataType: "json",
			success: this._setPageList,
			context: this,
		});

//DEBUG
alert("wiki.wikilist.js\n # reload: wikiList: _appendWikis");
//DEBUG
		
		/* 2. HTML Anfrage - Liste */
		$.ajax({
			type: "POST",																	// für RequestHandler - Entscheidung
			url: "/wiki/service/wikis",														// Aufruf der JSON Webseite und Übergabe der Rückgabe an das Array (wikis) (aus WikiService.php)
			dataType: "json",
			data: wiki,
			success: this._appendWikis,														// nur HTML Code 200 zurückkommt.
			context: this,
		});
				
	},    


	/* ----------------------- */
	/* Function: _appendWikis  */
	/* ----------------------- */
	_appendWikis: function(wikis) {
		
		var that = this;
	
	//DEBUG
		//alert("wiki.wikilist.js\n # GET: GetWikisCommand");
		//DEBUG			
	
		for(var i = 0; i < wikis.length; i++) {
			var wiki = wikis[i];
			// Finde HTML Element "template" und kopiere es, anschließend entferne HTML Klasse "template"
			var wikiElement = this.element.find(".template").clone().removeClass("template");	

			wikiElement.find(".author").text(wiki.author);									// Wiedergabe über eigene Funktion... siehe Unterlagen
			wikiElement.find(".category").text(wiki.category);	
			wikiElement.find(".creation_date").text(wiki.creation_date);	
			wikiElement.find(".expiration_date").text(wiki.expiration_date);	
			wikiElement.find(".title").text(wiki.title);		
			wikiElement.find(".notes").text(wiki.notes);	
			
			// Festlegung der Click Eigenschaft für alle Elemente der class Wiki
			wikiElement.click(wiki.url, function(event) {									// Click Ereignis (wiki.url = Übergabe der URL
				that._trigger("onWikiClicked", null, event.data);							// Übergabe der URL mit korrekter ID des Datensatzes
			});
				
			wikiElement.find(".delete_wiki").click(wiki, function(event) {
				that._trigger("onDeleteWikiClicked", null, event.data);						// Löst Funktion in applicaton.js aus...
				return false;																// Keine weitere Bearbeitung durch False
			});
				
			// Click für Bearbeiten eines Wikis
			wikiElement.find(".edit_wiki").click(wiki, function(event) {
				that._trigger("onEditWikiClicked", null, event.data);						// Löst Funktion in applicaton.js aus...
				return false;																// Keine weitere Bearbeitung durch False
			});	
			
			this.element.append(wikiElement);
		}
	},

	

	/* ------------------------ */
	/*  Function: _setPageList  */
	/* ------------------------ */
	_setPageList: function(pages) {
		var that = this;
		
		var pageNum = pages;

		var pageText = 1;
			
		for(var i = 0; i < pageNum; i++) {
			
			var wikiElement = this.element.find(".pages").clone().removeClass("pages");	

			wikiElement.find(".page").text(pageText);										// text setzen: Beschreibung
			wikiElement.find(".page").val(pageText);
			
			wikiElement.find(".page").click(pageText, function(event) {
				that._trigger("onWikiPageClicked", null, event.data);						// Löst Funktion in applicaton.js aus...
			});
			this.element.append(wikiElement);												// Element anfügen
			
			pageText = pageText + 1;
		}
	},

});		
/* Ende des Javascript Objekts */


/* --------------- */
/*  Dokumentation  */
/* --------------- */

// $.widget("widget.name", {code} );			Erstellt ein Widget
// _create:				Führt initial eine Methode aus, beim Laden des widgets (jQuery)

// private Funktionen beginnen mit _ (z.B. _create:)
// public Funktionen beginnen ohne _ (z.B. success:
// var name = erstellt eine Variable