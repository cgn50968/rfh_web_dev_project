/* ------------------ */
/*  Widget: wikiList  */
/* ------------------ */
																							// widget - die Funktion muss extra in der index.html aufgerufen werden. - wie ein Konstruktor
$.widget("wiki.wikiList", {  																// Beginn des Javascritp Objekts (Widget - wikiListe) {

	/* ------------------ */
	/* Function: _create  */
	/* ------------------ */
	_create: function() {																	//Instanzieren der Methode des Objekts

	//DEBUG
		alert("wiki.wikilist.js\n # _create: wikiList");
		//DEBUG
		
		/* 1. HTML Anfrage */
		$.ajax({
			url: "/wiki/service/wikis",															// Aufruf der JSON Webseite und Übergabe der Rückgabe an das Array (wikis) (aus WikiService.php)
			dataType: "json",
			success: this._appendWikis,															// nur HTML Code 200 zurückkommt.
			context: this
		});
		
		/* 2. HTML Anfrage */
		$.ajax({
			url: "/wiki/service/wikis",															
			dataType: "json",
			success: this._SetPageNum,
			context: this
		});
	},

	_SetPageNum: function(wikis) {
		alert(wikis[0]["pages"]);
	},
	
	
	/* ------------------ */
	/*  Function: reload  */
	/* ------------------ */
	reload: function() {
//DEBUG
alert("wiki.wikilist.js\n # reload: wikiList");
//DEBUG		
		this.element.find(".wiki:not(.template)").remove();									// das HTML Elemente wiki soll gelöscht werden, bis auf das HTML Element template (siehe Folie ... ab 400 ?)
		
		/* 1. HTML Anfrage */
		$.ajax({
			dataType: "json",
			url: "/wiki/service/wikis",
			success: this._appendWikis,
			context: this
		});
		
		/* 2. HTML Anfrage */
		$.ajax({
			url: "/wiki/service/wikis",															
			dataType: "json",
			success: this._SetPageNum,
			context: this
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
			wikiElement.find(".pages").text(wiki.pages);

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

	
	

	
	
	
	 _BuildPageNum: function(response)
	 {
	  var that = this;
	  pages = response.getResponseHeader('PageSize');
	  for (var i = 0; i < pages; i++) 
	  {
	   
	   var pageElement = this.element.find(".pagesize").clone();
	   pageElement.removeClass("pagesize");
	   var pagenum = i + 1;
	   pageElement.find(".page").text(pagenum);
	   pageElement.click(pagenum, function(event)
	   {
		that._trigger("onPageClicked", null, event.data); // "Geklickt" zurückgeben
	   });
	   this.element.append(pageElement);
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