//--------------------
// Widget: createDialog
//--------------------

$.widget("wiki.createDialog",$.ui.dialog, {
 
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
	open: function() {

//DEBUG		
alert("wiki.createdialog.js\n # open: createDialog");
//DEBUG		
		
		/* ------------------------------------------- */
		/*  Werte für validation_message zurücksetzen  */
		/* ------------------------------------------- */
		this.element.find(".validation_message").empty(); 					

		/* ------------------------------------------- */
		/*  Werte für <input> zurücksetzen  */
		/* ------------------------------------------- */		
		this.element.find("#title_field").val("");							
		this.element.find("#category_field").val("");
		this.element.find("#notes_field").val("");
		
		/* --------------------------------- */
		/*  ui-state-error Klasse entfernen  */
		/* --------------------------------- */
		this.element.find("#title_field").removeClass("ui-state-error").focus();	
		this._super();								
	},
  
  
	/* ---------------------------- */
	/*  Widget: Buttons hinzufügen  */
	/* ---------------------------- */
	_create: function() {	
	
//DEBUG		
alert("wiki.createdialog.js\n # _create:  Buttons");
//DEBUG		
	
		var that = this;			
		
		//-------------------
		// Buttons erstellen
		//-------------------
		this.options.buttons = [						
			//-----------
			// Speichern Button
			//-----------
			{
				text: "Speichern",
				click: function() {						// click = reagiert auf Benutzerinteraktion
//DEBUG		
alert("wiki.createdialog.js\n # _create:  Speichern: _createWiki");
//DEBUG		
					that._createWiki();					// Aufruf: _updateWiki
				}
			},
			
			//------------------
			// Abbrechen Button
			//------------------
			{					
				text: "Abbrechen",
				click: function() {						// click = reagiert auf Benutzerinteraktion
//DEBUG		
alert("wiki.createdialog.js\n # _create: Abbrechen: .close");
//DEBUG	
					that.close();						// Fehlerdialog schließen
				}
			}
		];
		this._super();									// Aufruf des übergeordneten jQuery-Widgets (in diesem Fall _create)
	},
	
	//-----------------------------------------------------
	// Funktion: updateWiki - Änderungen speichern
	//-----------------------------------------------------
	_createWiki: function() {	

//DEBUG		
alert("wiki.createdialog.js\n # _createWiki: read <input>");
//DEBUG	
	
		var wiki = {											// Übergabe der Werte aus dem Widget an das Objekt "wiki"

			title: this.element.find("#title_field").val(),							
			category: this.element.find("#category_field").val(),
			notes: this.element.find("#notes_field").val(),
			postMethod: "create",								// RequestHandler - Entscheidung
		};

		
//DEBUG		
alert("wiki.createdialog.js\n # POST: CreateWikiCommand");
//DEBUG	
		$.ajax({
			type: "POST",								// HTML Übergabe Typ festlegen
			url: "/wiki/service/wikis",						
			data: wiki,									// wiki (mit Datenfeldern) wird an das data Attribut übergeben
			
			success: function() {						// Bei Erfolg, function ausführen
				this.close();							// Widget schließen
				
//DEBUG		
alert("wiki.createdialog.js\n # _createWiki: onWikiCreated");
//DEBUG	
				this._trigger("onWikiCreated");			// Aufruf, um Liste neu zu laden
			},
			
			
			/* ------------------------------ */
			/*  SPEZIFISCHE FEHLERBEHANDLUNG  */
			/* ------------------------------ */
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

	