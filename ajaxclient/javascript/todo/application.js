$(function() {
// -------------------------------------
// Control - zentrale Steuerungsfunktion
// -------------------------------------

	// ----------------------
	// Fehlerbehandlung
	// ----------------------
	$(document).ajaxError(function(event, request) {					// Gibt den Response Status Text bei Fehlern wieder.
		$("#error_dialog").errorDialog("open", request.statusText);		// Methode Open des Error Dialogs
		$("#todo_details").hide();										// Bei Fehler #todo_details nicht anzeigen
		$("#todo_list").show();											// Bei Fehler #todo_list wieder anzeigen
		
		
		if (request.status == 404) {									// Reload der #todo_list bei Fehlercode 404
			$("#todo_list").todoList("reload");
			}
		//alert(request.statusText);									// Wiedergabe des Status Text über request.statusText
	});
	
	// Instanzieren der Widgets
	
	$("#error_dialog").errorDialog();									// Instanzierung des Widgets für Fehlerbehandlung
	$("#delete_dialog").deleteDialog( {									// Instanzierung des Widgets für den Löschdialog
		onTodoDeleted: function() {
			$("#todo_list").todoList("reload");		
		}
	});
	
	$("#todo_list").todoList(
	{
		// Was passiert wenn das Click Ereignis ausgelöst wird?
		onTodoClicked: function(event, todoUrl) 
		{
			$("#todo_list").hide();										// DIV Element ausblenden
			$("#todo_details").show();
			$("#todo_details").todoDetails("load", todoUrl);
		},
		
		onDeleteTodoClicked: function(event, todo) {
			$("#delete_dialog").deleteDialog("open", todo);				// Anzeigen des Löschen Dialogs
		}
	});																	// Instanzierung Widgets "todolist" aus todo.todolist.js für die HTML id "todo_list" in index.html
	
	$("#todo_details").todoDetails();									// Instanzierung "todo.todoDetails.js"
});

