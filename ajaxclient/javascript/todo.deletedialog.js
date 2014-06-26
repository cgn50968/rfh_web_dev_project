$.widget("todo.deleteDialog", $.ui.dialog, {
	options: {
		autoOpen: false,
		modal: true
	},
	
	open: function(todo) {								// Übergabe der Werte aus todo - Aus todo wird das Attribut url ausgelesen, damit der richtige Datensatz gelöscht werdenn kann.
		this._todo = todo;
		this._super();
	},
	
	// private Function - Löschen eines Todos
	_deleteTodo: function() {
		this.close();
		$.ajax({
			type: "DELETE",								// HTML Methode - DELETE
			url: this._todo.url,
			success: function() {
				this._trigger("onTodoDeleted");			// Aufruf onTodoDeleted in application.js
			},
			context: this								// 
		});
	},
	
	_create: function() {								// Button konfigurieren
		var that = this;								// Übergabe des Objektes this an that (that hat einen anderen Wert ... WARUM NUR??)
		
		this.options.buttons = [
			{
				text: "OK",
				click: function() {						// click = reagiert auf Benutzerinteraktion
					that._deleteTodo();					// Aufruf: Todo löschen
					alert("gelöscht");
				}
			},
			
			{
				text: "Abbrechen",
				click: function() {						// click = reagiert auf Benutzerinteraktion
					that.close();						// Fehlerdialog schließen
				}
			}
		];
			
		this._super();									// Aufruf des übergeordneten jQuery-Widgets (in diesem Fall _create)
	}
});