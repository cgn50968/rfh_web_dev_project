//---------------------
// Widget: deleteDialog
//---------------------

$.widget("wiki.deleteDialog", $.ui.dialog, {
	options: {
		autoOpen: false,
		modal: true
	},
	
	/* ---------------------- */
	/*  Widget wird geöffnet  */ 
	/* ---------------------- */
	open: function(wiki) {													// Übergabe der Werte aus wiki - Aus wiki wird das Attribut url ausgelesen, damit der richtige Datensatz gelöscht werdenn kann.
		this._wiki = wiki;
		this._super();
	},
	
	
	/* ------------------------------------ */
	/*  Widget erstellen und konfigurieren  */
	/* ------------------------------------ */
	_create: function() {													// Button konfigurieren
	
		var that = this;													// Übergabe des Objektes this an that (that hat einen anderen Wert ... WARUM NUR??)
		
		this.options.buttons = [
			/* ---------- */
			/*  OK Button */
			/* ---------- */
			{
				text: "OK",
				click: function() {											// click = reagiert auf Benutzerinteraktion
					that._deleteWiki();										// Wiki löschen
				}
			},
			
			/* ------------------ */
			/*  Abbrechen Button  */
			/* ------------------ */
			{
				text: "Abbrechen",
				click: function() {											// click = reagiert auf Benutzerinteraktion
					that.close();											// Fehlerdialog schließen
				}
			}
		];	
		this._super();														// Aufruf des übergeordneten jQuery-Widgets (in diesem Fall _create)
	},
	
	/* -------------- */
	/*  Wiki Löschen  */
	/* ---------------*/
	_deleteWiki: function() {

		this.close();
		$.ajax({
			type: "DELETE",													// HTML Methode - DELETE
			url: this._wiki.url,
			success: function() {
				this._trigger("onWikiDeleted");								// Aufruf onWikiDeleted in application.js
			},
			context: this								 
		});
	}
	
	
});