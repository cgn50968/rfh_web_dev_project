// --------------------
//  Widget: editDialog
// --------------------

$.widget("wiki.editDialog",$.ui.dialog, {
 
	// Festlegung der Standard Optionen (Konfiguration)
	options: {
		autoOpen: false,		// Soll nicht automatisch geöffnet werden.
		modal: true,			// "modal" bedeutet, wenn der Anwender neben den Dialog klickt, behält das Objekt dennoch den Focus
		width: 800				// Festlegen der Breite in Pixel (Da Dialog sonst zu klein)
	},
  
	open: function(wiki) {
		this._wiki = wiki;											// neues lokales Attribut _todo erstellen und die Werte aus todo übergeben (damit auch nach dem Instanzieren auf die Werte von todo zugegriffen werden kann)
		
		// Zurücksetzen der Werte
		this.element.find(".validation_message").empty(); 			// Text des Widgets leeren
		this.element.find("#title_field").removeClass("ui-state-error").focus();	// ui-state-error Klasse entfernen
		
		this.element.find("#title_field").val(wiki.title);			// Ersetzt den Titel im Widget
		this.element.find("#creation_date_field").val(wiki.creation_date);	// Ersetzt das Due_Date im Widget
		this.element.find("#expiration_date_field").val(wiki.expiration_date);
		this.element.find("#category_field").val(wiki.category);
		this.element.find("#notes_field").val(wiki.notes);			// Ersetzt die Notes im Widget
		this._super();								
	
	
	},
  
  
	// _Create wird ausgeführt, um Anpassungen am Widget durchzuführen 
	_create: function() {								// Button konfigurieren
		var that = this;								// Übergabe des Objektes this an that (that hat einen anderen Wert ... WARUM NUR??)
		
		this.options.buttons = [						// Buttons erstellen
			{											// Button - OK
				text: "OK",
				click: function() {						// click = reagiert auf Benutzerinteraktion
					that._updateWiki();					// Aufruf: Wiki aktualisieren
				}
			},
			
			{											// Button - Abbrechen
				text: "Abbrechen",
				click: function() {						// click = reagiert auf Benutzerinteraktion
					that.close();						// Fehlerdialog schließen
				}
			}
		];
			
		this._super();									// Aufruf des übergeordneten jQuery-Widgets (in diesem Fall _create)
	},

	// Funktion - Ändern des Todos
	_updateWiki: function() {	
		var wiki = {									// Übergabe der Werte/Felder aus dem Widget an das Objekt todo, damit die neuen Werte aus dem Widget übergeben werden.
			title: this.element.find("#title_field").val(),		// Attribut title wird angelegt und Wert aus Widget übergeben
			due_date: this.element.find("#due_date_field").val(),
			notes: this.element.find("#notes_field").val()
			//author: "Roger"				// !!!! Im Service anpassen !!!!
		};
		
		$.ajax({
			type: "PUT",								// HTML Übergabe Typ festlegen
			url: this._wiki.url,						// Ruft die in todo gespeicherte URL auf (die URL wird in todo.todolist.js festgelegt)
			headers: {"If-Match": this._wiki.version },	// Definierung des If-Match Wertes im Header (wird vom "Service" erwartet.
			data: wiki,									// todo wird an das data Attribut übergeben
			
			success: function() {						// Bei Erfolg, function ausführen
				this.close();							// Widget schließen
				this._trigger("onWikiEdited");			// Aufruf, um Liste neu zu laden
			},
			
			// ----------------------------
			// SPEZIFISCHE FEHLERBEHANDLUNG
			// ----------------------------
			error: function(request) {
			
			// Zurücksetzen der Werte
			this.element.find(".validation_message").empty(); 			// Text des Widgets leeren
			this.element.find("#title_field").removeClass("ui-state-error").focus();	// ui-state-error Klasse entfernen
			if (request.status == 400) {									
		
				var validationMessages = $.parseJSON(request.responseText); // Reload der #todo_list bei Fehlercode 400
				
				if(validationMessages.title) {								// Falls Hinweis zum Titel ausgegeben wird...
					this.element.find(".validation_message").text(validationMessages.title); // Übergabe des Errors aus RequestHandler.php Zeile 25
					this.element.find("#title_field").addClass("ui-state-error").focus();	// Rot umranden und Focus auf Element setzen
					}
				}
			},
			context: this								// context sorgt dafür, dass this den richtigen Wert hat.
		});
	}
	
});

	