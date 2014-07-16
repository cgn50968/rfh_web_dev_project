/* ------------------ */
/*  Widget: wikiSearch*/
/* ------------------ */
																							// widget - die Funktion muss extra in der index.html aufgerufen werden. - wie ein Konstruktor
$.widget("wiki.wikiSearch", {  																// Beginn des Javascritp Objekts (Widget - wikiListe) {

	/* ------------------ */
	/* Function: _create  */
	/* ------------------ */
	jQuery(document).ready(function($); 									//jQuery wartet, daß die Seite fertig ist, um Javascript ausführen zu können
	{
    		$('.btnSearch').click(function()						//jQuery-Funktion "click": wenn Knopfdruck, dann führe Funktion makeAjaxRequest() aus
			{
    			makeAjaxRequest();
    		});
			

            $('form').submit(function(e)							//jQuery-Funktion "submit": Inhalt des Formulars wird eingereicht; damit sind Formulr und Button mit der gleichen Funktion belegt: makeAjaxRequest()
			{
                e.preventDefault();
                makeAjaxRequest();
                return false;
            });																	//Instanzieren der Methode des Objekts
	
			function makeAjaxRequest()
			{
	
				/* 1. HTML Anfrage - Liste */
				$.ajax({
					//url: "/wiki/SERVICE/RequestHandler.php?command=SearchWikisCommand",												// Aufruf der JSON Webseite und Übergabe der Rückgabe an das Array (wikis) (aus WikiService.php)
					type: "POST",																	// für RequestHandler - Entscheidung
					url: "/wiki/service/wikis",														// Aufruf der JSON Webseite und Übergabe der Rückgabe an das Array (wikis) (aus WikiService.php)
					dataType: "json",
					data: wiki,
					
					success: function(response)						//Bei Erfolg Funktion "response" ausführen
					{
                        $("#wiki_list").hide();
						$('#wiki_search').html(response);//Dabei wird an das HTML-tag resultTable der Wert zurückgegeben
                    }
				});
				
				/* 2. HTML Anfrage - Header */
				/*$.ajax({
					url: "/wiki/SERVICE/RequestHandler.php?command=SearchWikisCommand",															
					dataType: "json",
					success: this._setPageNumberHeader,
					context: this,
				});
				
				/* 3. HTML Anfrage - PageSize */
				/*$.ajax({
					url: "/wiki/SERVICE/RequestHandler.php?command=SearchWikisCommand",															
					dataType: "json",
					success: this._setPageList,
					context: this,
				});*/
			}
	},

	
	
	/* ------------------ */
	/*  Function: reload  */
	/* ------------------ */
	
	reload: function() {
	
		this.element.find(".wiki:not(.template)").remove();									// das HTML Elemente wiki soll gelöscht werden, bis auf das HTML Element template (siehe Folie ... ab 400 ?)
		
				/* 1. HTML Anfrage - Liste */
		$.ajax({
			url: "/wiki/SERVICE/RequestHandler.php?command=SearchWikisCommand",												// Aufruf der JSON Webseite und Übergabe der Rückgabe an das Array (wikis) (aus WikiService.php)
			dataType: "json",
			success: this._appendWikis,														// nur HTML Code 200 zurückkommt.
			context: this,
		});
		
		/* 2. HTML Anfrage - Header */
		$.ajax({
			url: "/wiki/SERVICE/RequestHandler.php?command=SearchWikisCommand",															
			dataType: "json",
			success: this._setPageNumberHeader,
			context: this,
		});
		
		/* 3. HTML Anfrage - PageSize */
		$.ajax({
			url: "/wiki/SERVICE/RequestHandler.php?command=SearchWikisCommand",															
			dataType: "json",
			success: this._setPageList,
			context: this,
		});
	},    


	
	/* ----------------------- */
	/* Function: _appendWikis  */
	/* ----------------------- */
	_appendWikis: function(searchwikis) {
	
		$("#wiki_list").hide();
		
		var that = this;
		
		for(var i = 0; i < searchwikis.length; i++) {
			var wiki = searchwikis[i];
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


	
	/* -------------------------------- */
	/*  Function: _setPageNumberHeader  */
	/* -------------------------------- */
	_setPageNumberHeader: function(searchwikis) {
		
		$.ajax({
			dataType: "json",
			url: "/wiki/SERVICE/RequestHandler.php?command=SearchWikisCommand",
			headers: {"PageSize": searchwikis[0]["pages"]},
			context: this
		});
	},	
	


	/* ------------------------ */
	/*  Function: _setPageList  */
	/* ------------------------ */
	_setPageList: function(searchwikis) {
		var that = this;
	
			var wikiElement = this.element.find(".pages").clone().removeClass("pages");	
			wikiElement.find(".page").text(searchwikis[0]["pages"]);								// Text setzen

			// Dringend eine Funktion für Click entwerfen...
			wikiElement.find(".page").click(searchwikis[0]["pages"], function(event) {
				that._trigger("onWikiPageClicked", null, event.data);						// Löst Funktion in applicaton.js aus...
			});
				
			this.element.append(wikiElement);
	},


	
});		






















/*
jQuery(document).ready(function($) 									//jQuery wartet, daß die Seite fertig ist, um Javascript ausführen zu können
	{
    		$('.btnSearch').click(function()						//jQuery-Funktion "click": wenn Knopfdruck, dann führe Funktion makeAjaxRequest() aus
			{
    			makeAjaxRequest();
    		});
			

            $('form').submit(function(e)							//jQuery-Funktion "submit": Inhalt des Formulars wird eingereicht; damit sind Formulr und Button mit der gleichen Funktion belegt: makeAjaxRequest()
			{
                e.preventDefault();
                makeAjaxRequest();
                return false;
            });

            function makeAjaxRequest()								//Definition der Funktion
			{
                $.ajax(
				{
                    url: 'SERVICE/search.php',						//Verknüpfung mit search.php
                    type: 'get',
                    data: {name: $('input#name').val()},
                    success: function(response)						//Bei Erfolg Funktion "response" ausführen
					{
                        $("#wiki_list").hide();
						$('table#resultTable tbody').html(response);//Dabei wird an das HTML-tag resultTable der Wert zurückgegeben
                    }
                });
            }
	}
);
*/