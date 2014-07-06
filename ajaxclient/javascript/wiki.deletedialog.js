//---------------------
// Widget: deleteDialog
//---------------------

$.widget("wiki.deleteDialog", $.ui.dialog, {
	options: {
		autoOpen: false,
		modal: true
	},
	
	//----------------------
	// Widget wird geöffnet
	//----------------------
	open: function(wiki) {								// Übergabe der Werte aus wiki - Aus wiki wird das Attribut url ausgelesen, damit der richtige Datensatz gelöscht werdenn kann.
//DEBUG
alert("wiki.deletedialog.js - open");
//DEBUG
		this._wiki = wiki;
		alert(this._wiki.url);							// ALARM für falschen Pfad...
		this._super();
	},
	
	//------------------------------------
	// Widget erstellen und konfigurieren
	//------------------------------------
	_create: function() {								// Button konfigurieren
//DEBUG
alert("wiki.deletedialog.js - _create (Buttons)");
//DEBUG
		var that = this;								// Übergabe des Objektes this an that (that hat einen anderen Wert ... WARUM NUR??)
		
		this.options.buttons = [
			//----
			// OK
			//----
			{
				text: "OK",
				click: function() {						// click = reagiert auf Benutzerinteraktion
					that._deleteWiki();					// Wiki löschen
//DEBUG
alert("wiki.deletedialog.js - OK - _deleteWiki()");
//DEBUG
				}
			},
			
			//-----------
			// Abbrechen
			//-----------
			{
				text: "Abbrechen",
				click: function() {						// click = reagiert auf Benutzerinteraktion
//DEBUG
alert("wiki.deletedialog.js - Cancel - .close");
//DEBUG
					that.close();						// Fehlerdialog schließen
				}
			}
		];	
		this._super();									// Aufruf des übergeordneten jQuery-Widgets (in diesem Fall _create)
	},
	
	//-------------------
	// Löschen des Wikis (Aufruf bei OK - click: function [_deleteWiki()])
	//-------------------
	_deleteWiki: function() {
//DEBUG
alert("wiki.deletedialog.js - _deleteWiki");
//DEBUG
		this.close();
		$.ajax({
			type: "DELETE",								// HTML Methode - DELETE
			url: this._wiki.url,
			success: function() {
//DEBUG
alert("wiki.deletedialog.js - DELETE - CALL: onWikiDeleted");
//DEBUG
				this._trigger("onWikiDeleted");			// Aufruf onWikiDeleted in application.js
			},
			context: this								// 
		});
	}
	
	
});