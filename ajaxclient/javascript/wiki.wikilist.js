// ----------------------
// Darstellung der Liste - vorbereitung der Links für Details
// ----------------------


																							// widget - die Funktion muss extra in der index.html aufgerufen werden. - wie ein Konstruktor
$.widget("wiki.wikiList", {  																// Beginn des Javascritp Objekts (Widget - wikiListe) {

	// -----------------
	// Function _create
	// -----------------
	_create: function() {																	//Instanzieren der Methode des Objekts
		$.ajax({
		url: "/rfh_web_dev_project/service/wikis",											// Aufruf der JSON Webseite und Übergabe der Rückgabe an das Array (wikis) (aus WikiService.php)
		dataType: "json",
		  
		success: function(wikis) {		// nur HTML Code 200 zurückkommt.
			var that = this;
			for(var i = 0; i < wikis.length; i++) {
				var wiki = wikis[i];
				// Finde HTML Element "template" und kopiere es, anschließend entferne HTML Klasse "template"
				var wikiElement = this.element.find(".template").clone().removeClass("template");	

				wikiElement.find(".author").text(wiki.author);								// Wiedergabe über eigene Funktion... siehe Unterlagen
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
		context: this
		});
	},

	// -----------------
	// Function reload
	// -----------------
	reload: function() {
		
		this.element.find(".wiki:not(.template)").remove();									// das HTML Elemente todo soll gelöscht werden, bis auf das HTML Element template (siehe Folie ... ab 400 ?)
		
		$.ajax({
		dataType: "json",
		url: "/rfh_web_dev_project/service/wikis",
		
		success: function(wikis) {															// Bei Erfolg: HTML Code 200
			var that = this;
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

				// Festlegung der Click Eigenschaft für alle Elemente der class todo
				wikiElement.click(wiki.url, function(event) {									// Click Ereignis (todo.url = Übergabe der URL
					that._trigger("onWikiClicked", null, event.data);							// Übergabe der URL mit korrekter ID des Datensatzes
				});
				wikiElement.find(".delete_wiki").click(wiki, function(event) {
					that._trigger("onDeleteWikiClicked", null, event.data);
					return false;																// Keine weitere Bearbeitung durch False
				});
			 this.element.append(wikiElement);
			}
		},
		context: this
		});
	}
    
});									// Ende des Javascript Objekts }

//-----------------------
// Dokumentation
//-----------------------



// $.widget("widget.name", {code} );			Erstellt ein Widget
// _create:				Führt initial eine Methode aus, beim Laden des widgets (jQuery)

// private Funktionen beginnen mit _ (z.B. _create:)
// public Funktionen beginnen ohne _ (z.B. success:
// var name = erstellt eine Variable