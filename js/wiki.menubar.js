/* ----------------- */
/*  Widget: menuBar  */
/* ----------------- */
$.widget("wiki.menuBar", {

	/* ----------------- */
	/*  _create: menuBar */
	/* ----------------- */
	_create: function() {

		var that = this;			
		
		/* ----------------------------- */
		/*  Trigger: onShowWikisClicked  */
		/* ----------------------------- */
		this.element.find(".show_wikis").click(function() {			// Aktiviert den Link auf dem Element
			that._trigger("onShowWikisClicked");					// Ausführen der Funktion onShowWikisClicked in wiki.application.js	
			return false;
		});
		
		/* ------------------------------- */
		/*  Trigger: onCreateWikisClicked  */
		/* ------------------------------- */
		this.element.find(".create_wiki").click(function() {		// Aktiviert den Link auf dem Element
			that._trigger("onCreateWikiClicked");					// Ausführen der Funktion onCreateWikisClicked in wiki.application.js	
			return false;
		});
		
		/* ------------------------------- */
		/*  Trigger: onShowContactClicked  */
		/* ------------------------------- */
		this.element.find(".show_contact").click(function() {		// Aktiviert den Link auf dem Element
			that._trigger("onShowContactClicked");					// Ausführen der Funktion onCreateWikisClicked in wiki.application.js	
			return false;
		});
	}

});