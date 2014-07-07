/* ----------------- */
/*  Widget: menuBar  */
/* ----------------- */

$.widget("wiki.menuBar", {

	_create: function() {
//DEBUG		
alert("wiki.menubar.js\n# _create:\n# .show_wikis\n# .create_wiki");
//DEBUG	
		var that = this;			
		
		/* ----------------------------- */
		/*  Trigger: onShowWikisClicked  */
		/* ----------------------------- */
		this.element.find(".show_wikis").click(function() {			// Aktiviert den Link auf dem Element
//DEBUG		
alert("wiki.menubar.js\n# .show_wikis");
//DEBUG	
			that._trigger("onShowWikisClicked");					// Ausführen der Funktion onShowWikisClicked in wiki.application.js	
			return false;
		});
		
		/* ------------------------------- */
		/*  Trigger: onCreateWikisClicked  */
		/* ------------------------------- */
		this.element.find(".create_wiki").click(function() {		// Aktiviert den Link auf dem Element
//DEBUG		
alert("wiki.menubar.js\n# .create_wiki");
//DEBUG	
			that._trigger("onCreateWikiClicked");					// Ausführen der Funktion onCreateWikisClicked in wiki.application.js	
			return false;
		});
	}

});