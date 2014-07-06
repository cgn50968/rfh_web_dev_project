$(function() {
// -------------------------------------
// CONTROL - Zentrale Steuerungsfunktion
// -------------------------------------

// ----------------
//  ERROR HANDLING
// ----------------
	$(document).ajaxError(function(event, request) {					// Gibt den Response Status Text bei Fehlern wieder.
		$("#error_dialog").errorDialog("open", request.statusText);		// Methode Open des Error Dialogs (Wiedergabe des Request Status über request.statusText
		$("#wiki_details").hide();										// Bei Fehler #todo_details nicht anzeigen
		$("#wiki_list").show();											// Bei Fehler #todo_list wieder anzeigen
		
		if (request.status == 404) {									// Reload der #todo_list bei Fehlercode 404
			$("#wiki_list").wikiList("reload");
		}
	});
	
// ----------------------------
//  INSTANZIIERUNG DER WIDGETS
// ----------------------------
	
	// ----------------------------
	//  Instanziierung "wiki.errordialog.js" .errorDialog
	// ----------------------------
	$("#error_dialog").errorDialog();									// Instanzierung des Widgets für Fehlerbehandlung
	
	// -----------------------------
	//  Instanziierung deleteDialog
	// -----------------------------
	$("#delete_dialog").deleteDialog( {									// Instanzierung des Widgets für den Löschdialog
		onWikiDeleted: function() {
			$("#wiki_list").wikiList("reload");		
		}
	});
	
	// -------------------------
	//  Instanziierung "wiki.wikilist.js" .wikiList
	// -------------------------
	$("#wiki_list").wikiList(
	{
		// Was passiert wenn das Click Ereignis ausgelöst wird?
		onWikiClicked: function(event, wikiUrl) 
		{
			$("#wiki_list").hide();										// DIV Element ausblenden
			$("#wiki_details").show();
			$("#wiki_details").wikiDetails("load", wikiUrl);
		},
		
		// Funktion: Laden des Widgets deleteDialog
		onDeleteWikiClicked: function(event, wiki) {
			$("#delete_dialog").deleteDialog("open", wiki);				// Anzeigen des Löschen Dialogs
		},
		
		// FUnktion: Laden des Widgets editDialog
		onEditWikiClicked: function(event, wiki) {
			$("#edit_dialog").editDialog("open", wiki);					// Anzeigen des Bearbeiten Dialogs durch "open", Übergabe der Ereignis-Parameter mit "wiki"
		}
	});																	// Instanzierung Widgets "wikilist" aus todo.todolist.js für die HTML id "wiki_list" in index.html
	
	// -------------------------------------
	//  Instanziieren "wiki.wikiDetails.js"
	// -------------------------------------
	$("#wiki_details").wikiDetails();									// Instanzierung "wiki.wikiDetails.js"
	
	// -----------------------------
	//  Instanziierung "wiki.editdialog.js" .editDialog
	// -----------------------------
	$("#edit_dialog").editDialog( {										// Das # versteckt das HTML Element beim ersten Aufruf
		onWikiEdited: function() {							
			$("#wiki_list").wikiList("reload");							// Reload der Seite - Aufruf aus "wiki.editdialog.js"
		}
	});
});

