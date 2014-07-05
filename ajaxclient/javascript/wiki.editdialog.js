//--------------------
// Widget: editDialog
//--------------------

$.widget("wiki.editDialog",$.ui.dialog, {
 
	//--------------------------------------------------
	// Festlegung der Standard Optionen (Konfiguration)
	//--------------------------------------------------
	options: {
		autoOpen: false,		// Soll nicht automatisch geöffnet werden.
		modal: true,			// "modal" bedeutet, wenn der Anwender neben den Dialog klickt, behält das Objekt dennoch den Focus
		width: 800				// Festlegen der Breite in Pixel (Da Dialog sonst zu klein)
	},
  
	//-------------------
	//Öffnen des Widgets
	//-------------------
	open: function(wiki) {
		this._wiki = wiki;															// neues lokales Attribut _todo erstellen und die Werte aus todo übergeben (damit auch nach dem Instanzieren auf die Werte von todo zugegriffen werden kann)
		
		//-------------------------------------------
		// Werte für validation_message zurücksetzen
		//-------------------------------------------
		this.element.find(".validation_message").empty(); 					
		
		//---------------------------------
		// ui-state-error Klasse entfernen
		//---------------------------------
		this.element.find("#title_field").removeClass("ui-state-error").focus();	
		
		//----------------------------------------------------------------------------------------------
		// Übergabe der Werte aus Array "wiki"
		// val() weist Eingabefeldern Werte zu.
		// Bei Aufruf ohne Übergabeparameter werden die aktuellen Werte der Eingabefelder zurückgegeben.
		//-----------------------------------------------------------------------------------------------
		this.element.find("#title_field").val(wiki.title);							
		this.element.find("#creation_date_field").val(wiki.creation_date);			
		this.element.find("#expiration_date_field").val(wiki.expiration_date);
		this.element.find("#category_field").val(wiki.category);
		this.element.find("#notes_field").val(wiki.notes);							
		this._super();								
	},
  
	//----------------------------
	// Widget: Buttons hinzufügen
	//----------------------------
	_create: function() {			
		var that = this;			
		
		//-------------------
		// Buttons erstellen
		//-------------------
		this.options.buttons = [						
			//-----------
			// OK Button
			//-----------
			{
				text: "OK",
				click: function() {						// click = reagiert auf Benutzerinteraktion
					that._updateWiki();					// Aufruf: _updateWiki
				}
			},
			
			//------------------
			// Abbrechen Button
			//------------------
			{					
				text: "Abbrechen",
				click: function() {						// click = reagiert auf Benutzerinteraktion
					that.close();						// Fehlerdialog schließen
				}
			}
		];
		this._super();									// Aufruf des übergeordneten jQuery-Widgets (in diesem Fall _create)
	},
	
	//-----------------------------------------------------
	// Funktion: updateWiki - Änderungen speichern
	//-----------------------------------------------------
	_updateWiki: function() {	
	
		var wiki = {									// Übergabe der Werte aus dem Widget an das Objekt "wiki"
			
			title: this.element.find("#title_field").val(),							
			creation_date: this.element.find("#creation_date_field").val(),			
			expiration_date: this.element.find("#expiration_date_field").val(),
			category: this.element.find("#category_field").val(),
			notes: this.element.find("#notes_field").val()	
			//author: "Roger"				// !!!! Im Service anpassen !!!!
			
		};
		
		// DEBUGGING
		alert(this._wiki.url);
		alert(wiki.expiration_date);
		alert(wiki.title);
		alert(wiki.notes);
		alert(this._wiki.version);
		
		$.ajax({
			type: "PUT",								// HTML Übergabe Typ festlegen
			url: this._wiki.url,						// Ruft die in wiki gespeicherte URL auf (die URL wird in wiki.wikilist.js festgelegt)
			headers: {"If-Match": this._wiki.version },	// Definierung des If-Match Wertes im Header (wird vom "Service" erwartet.
			data: wiki,									// wiki wird an das data Attribut übergeben
			
			success: function() {						// Bei Erfolg, function ausführen
				this.close();							// Widget schließen
				alert("wiki.editdialog.js - 109 - PUT erhalten");
			
				this._trigger("onWikiEdited");			// Aufruf, um Liste neu zu laden
			},
			
			
			// ----------------------------
			// SPEZIFISCHE FEHLERBEHANDLUNG
			// ----------------------------
			error: function(request) {
			
			// Zurücksetzen der Werte
			this.element.find(".validation_message").empty(); 							// Text des Widgets leeren
			this.element.find("#title_field").removeClass("ui-state-error").focus();	// ui-state-error Klasse entfernen
			if (request.status == 400) {									
		
				var validationMessages = $.parseJSON(request.responseText); 			// Reload der #todo_list bei Fehlercode 400
				
				if(validationMessages.title) {											// Falls Hinweis zum Titel ausgegeben wird...
					this.element.find(".validation_message").text(validationMessages.title); // Übergabe des Errors aus RequestHandler.php Zeile 25
					this.element.find("#title_field").addClass("ui-state-error").focus();	// Rot umranden und Focus auf Element setzen
					}
				}
			},
			context: this								// context sorgt dafür, dass this den richtigen Wert hat.
		});
	}
	
});

	