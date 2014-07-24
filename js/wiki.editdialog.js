/* -------------------- */
/*  Widget: editDialog  */
/* -------------------- */
$.widget("wiki.editDialog",$.ui.dialog, {
 
	/* -------------------------------------------------- */
	/*  Festlegung der Standard Optionen (Konfiguration)  */
	/* -------------------------------------------------- */
	options: {
		autoOpen: false,																			// Soll nicht automatisch geöffnet werden.
		modal: true,																				// "modal" bedeutet, wenn der Anwender neben den Dialog klickt, behält das Objekt dennoch den Focus
		width: 800																					// Festlegen der Breite in Pixel (Da Dialog sonst zu klein)
	},
  
	/* -------------------- */
	/*  Öffnen des Widgets  */
	/* -------------------- */
	open: function(wiki) {

		this._wiki = wiki;															
		
		/* ------------------------------------------- */
		/*  Werte für validation_message zurücksetzen  */
		/* ------------------------------------------- */
		this.element.find(".validation_message").empty(); 					
		
		/* --------------------------------- */
		/*  ui-state-error Klasse entfernen  */
		/* --------------------------------- */
		this.element.find("#category_field").removeClass("ui-state-error").focus();	
		this.element.find("#title_field").removeClass("ui-state-error");
		this.element.find("#notes_field").removeClass("ui-state-error");
		
		/* ----------------------------------------------------------------------------------------------- */
		/*  Übergabe der Werte aus Array "wiki" 														   */
		/*  val() weist Eingabefeldern Werte zu.  														   */
		/*  Bei Aufruf ohne Übergabeparameter werden die aktuellen Werte der Eingabefelder zurückgegeben.  */
		/* ----------------------------------------------------------------------------------------------- */
		this.element.find("#author_field").val(wiki.author);		
		this.element.find("#title_field").val(wiki.title);							
		this.element.find("#creation_date_field").val(wiki.creation_date);			
		this.element.find("#expiration_date_field").val(wiki.expiration_date);
		this.element.find("#category_field").val(wiki.category);
		this.element.find("#notes_field").val(wiki.notes);							
		this._super();								
	},
  
	/* ---------------------------- */
	/*  Widget: Buttons hinzufügen  */
	/* ---------------------------- */
	_create: function() {	
	
		var that = this;			
		
		/* ------------------- */
		/*  Buttons erstellen  */
		/* ------------------- */
		this.options.buttons = [						
			/* ----------- */
			/*  OK Button  */
			/* ----------- */
			{
				text: "OK",
				click: function() {																		
					that._updateWiki();																//  Aufruf: _updateWiki
				}
			},
			
			/* ------------------ */
			/*  Abbrechen Button  */
			/* ------------------ */
			{					
				text: "Abbrechen",
				click: function() {																	
					that.close();																	// Fehlerdialog schließen
				}
			}
		];
		this._super();																				// Aufruf des übergeordneten jQuery-Widgets (in diesem Fall _create)
	},
	
	/* --------------------------------------------- */
	/*  Funktion: updateWiki - Änderungen speichern  */
	/* --------------------------------------------- */
	_updateWiki: function() {	

		var wiki = {																				// Übergabe der Werte aus dem Widget an das Objekt "wiki"
			title: this.element.find("#title_field").val(),							
			creation_date: this.element.find("#creation_date_field").val(),			
			expiration_date: this.element.find("#expiration_date_field").val(),
			category: this.element.find("#category_field").val(),
			notes: this.element.find("#notes_field").val()	
		};

		
		$.ajax({
			type: "PUT",																			// HTML Übergabe Typ festlegen
			url: this._wiki.url,																	// Ruft die in wiki gespeicherte URL auf (die URL wird in wiki.wikilist.js festgelegt)
			headers: {"If-Match": this._wiki.version },												// Definierung des If-Match Wertes im Header (wird vom "Service" erwartet.
			data: wiki,																				// wiki wird an das data Attribut übergeben
			
			success: function() {																	// Bei Erfolg, function ausführen
				this.close();																		// Widget schließen
				this._trigger("onWikiEdited");														// Aufruf, um Liste neu zu laden
			},
			
			
			/* ------------------------------ */
			/*  SPEZIFISCHE FEHLERBEHANDLUNG  */
			/* ------------------------------ */
			error: function(request) {
			
				// Zurücksetzen der Werte
				this.element.find(".validation_message").empty(); 									// Text des Widgets leeren
				this.element.find("#title_field").removeClass("ui-state-error").focus();			// ui-state-error Klasse entfernen
				this.element.find("#category_field").removeClass("ui-state-error").focus();			// ui-state-error Klasse entfernen
				this.element.find("#notes_field").removeClass("ui-state-error").focus();			// ui-state-error Klasse entfernen
				
				if (request.status == 400) {									
			
					var validationMessages = $.parseJSON(request.responseText); 					// Reload der #wiki_list bei Fehlercode 400
					
					/* title */
					if(validationMessages.title) {													// Falls Hinweis zum Titel ausgegeben wird...
						this.element.find(".validation_message").text(validationMessages.title); 	// Übergabe des Errors aus RequestHandler.php
						this.element.find("#title_field").addClass("ui-state-error").focus();		// Roter Rahmen und Focus auf Element setzen
					}
					/* category */
					if(validationMessages.category) {												
						this.element.find(".validation_message").text(validationMessages.category); 
						this.element.find("#category_field").addClass("ui-state-error").focus();	
					}
					/* notes */
					if(validationMessages.notes) {												
						this.element.find(".validation_message").text(validationMessages.notes);
						this.element.find("#notes_field").addClass("ui-state-error").focus();	
					}
				}
			},
			context: this																			// context sorgt dafür, dass this den richtigen Wert hat.
		});
	}
	
});

	