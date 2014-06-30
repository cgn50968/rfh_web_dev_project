$(function() {
// -------------------------------------
// Control - zentrale Steuerungsfunktion
// -------------------------------------

	// ----------------------
	// Fehlerbehandlung
	// ----------------------
	$(document).ajaxError(function(event, request) {					// Gibt den Response Status Text bei Fehlern wieder.
		$("#error_dialog").errorDialog("open", request.statusText);		// Methode Open des Error Dialogs
		$("#wiki_details").hide();										// Bei Fehler #todo_details nicht anzeigen
		$("#wiki_list").show();											// Bei Fehler #todo_list wieder anzeigen
		
		
		if (request.status == 404) {									// Reload der #todo_list bei Fehlercode 404
			$("#wiki_list").wikiList("reload");
			}
		//alert(request.statusText);									// Wiedergabe des Status Text über request.statusText
	});
	
	// Instanzieren der Widgets
	
	$("#error_dialog").errorDialog();									// Instanzierung des Widgets für Fehlerbehandlung
	$("#delete_dialog").deleteDialog( {									// Instanzierung des Widgets für den Löschdialog
		onWikiDeleted: function() {
			$("#wiki_list").wikiList("reload");		
		}
	});
	
	$("#wiki_list").wikiList(
	{
		// Was passiert wenn das Click Ereignis ausgelöst wird?
		onWikiClicked: function(event, wikiUrl) 
		{
			$("#wiki_list").hide();										// DIV Element ausblenden
			$("#wiki_details").show();
			$("#wiki_details").wikiDetails("load", wikiUrl);
		},
		
		onDeleteWikiClicked: function(event, wiki) {
			$("#delete_dialog").deleteDialog("open", wiki);				// Anzeigen des Löschen Dialogs
		}
	});																	// Instanzierung Widgets "todolist" aus todo.todolist.js für die HTML id "todo_list" in index.html
	
	$("#wiki_details").wikiDetails();									// Instanzierung "wiki.wikiDetails.js"
});

