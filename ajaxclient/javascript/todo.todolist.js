// ----------------------
// Darstellung der Liste - vorbereitung der Links für Details
// ----------------------


																						// widget - die Funktion muss extra in der index.html aufgerufen werden. - wie ein Konstruktor
$.widget("todo.todoList", {  															// Beginn des Javascritp Objekts (Widget - todoListe) {

	// -----------------
	// Function _create
	// -----------------
	_create: function() {																	//Instanzieren der Methode des Objekts
		$.ajax({
		url: "/ordonr/4 service/todos",		// Aufruf der JSON Webseite und Übergabe der Rückgabe an das Array (todos) (aus TodoService.php)
		dataType: "json",
		  
		success: function(todos) {		// nur HTML Code 200 zurückkommt.
			var that = this;
			for(var i = 0; i < todos.length; i++) {
				var todo = todos[i];
				// Finde HTML Element "template" und kopiere es, anschließend entferne HTML Klasse "template"
				var todoElement = this.element.find(".template").clone().removeClass("template");	

				todoElement.find(".author").text(todo.author);								// Wiedergabe über eigene Funktion... siehe Unterlagen
				todoElement.find(".due_date").text(todo.due_date);	
				todoElement.find(".title").text(todo.title);	

				// Festlegung der Click Eigenschaft für alle Elemente der class todo
				todoElement.click(todo.url, function(event) {									// Click Ereignis (todo.url = Übergabe der URL
					that._trigger("onTodoClicked", null, event.data);							// Übergabe der URL mit korrekter ID des Datensatzes
				});
				todoElement.find(".delete_todo").click(todo, function(event) {
					that._trigger("onDeleteTodoClicked", null, event.data);						// Löst Funktion in applicaton.js aus...
					return false;																// Keine weitere Bearbeitung durch False
				});
				this.element.append(todoElement);
			}
		},
		context: this
		});
	},

	// -----------------
	// Function reload
	// -----------------
	reload: function() {
		
		this.element.find(".todo:not(.template)").remove();									// das HTML Elemente todo soll gelöscht werden, bis auf das HTML Element template (siehe Folie ... ab 400 ?)
		
		$.ajax({
		dataType: "json",
		url: "/ordonr/4 service/todos",
		
		success: function(todos) {															// Bei Erfolg: HTML Code 200
			var that = this;
			for(var i = 0; i < todos.length; i++) {
				var todo = todos[i];
				
				// Finde HTML Element "template" und kopiere es, anschließend entferne HTML Klasse "template"
				var todoElement = this.element.find(".template").clone().removeClass("template");	

				todoElement.find(".author").text(todo.author);									// Wiedergabe über eigene Funktion... siehe Unterlagen
				todoElement.find(".due_date").text(todo.due_date);	
				todoElement.find(".title").text(todo.title);	

				// Festlegung der Click Eigenschaft für alle Elemente der class todo
				todoElement.click(todo.url, function(event) {									// Click Ereignis (todo.url = Übergabe der URL
					that._trigger("onTodoClicked", null, event.data);							// Übergabe der URL mit korrekter ID des Datensatzes
				});
				todoElement.find(".delete_todo").click(todo, function(event) {
					that._trigger("onDeleteTodoClicked", null, event.data);
					return false;																// Keine weitere Bearbeitung durch False
				});
			 this.element.append(todoElement);
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