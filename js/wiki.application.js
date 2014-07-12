$(function() {
// -------------------------------------
// CONTROL - Zentrale Steuerungsfunktion
// -------------------------------------

// ----------------
//  ERROR HANDLING
// ----------------
	$(document).ajaxError(function(event, request) {					// Gibt den Response Status Text bei Fehlern wieder.
//DEBUG
alert("wiki.application.js\n # .ajaxError");
//DEBUG
		$("#error_dialog").errorDialog("open", request.statusText);		// Methode Open des Error Dialogs (Wiedergabe des Request Status über request.statusText
		$("#wiki_details").hide();										// Bei Fehler #todo_details nicht anzeigen
		$("#wiki_list").show();											// Bei Fehler #todo_list wieder anzeigen
		
		if (request.status == 404) {									// Reload der #todo_list bei Fehlercode 404
			$("#wiki_list").wikiList("reload");
		}
	});
	
/* ------------------------------------- */
/*  <<-- INSTANZIIERUNG DER WIDGETS -->> */
/* ------------------------------------- */
	
	
	
	/* --------------------------------------------------- */
	/*  Instanziierung "wiki.errordialog.js" .errorDialog  */
	/* --------------------------------------------------- */
	$("#error_dialog").errorDialog();									// Instanzierung des Widgets für Fehlerbehandlung
	
	
	
	/* ------------------------------------------- */
	/*  Instanziierung "wiki.menubar.js" .menuBar  */
	/* ------------------------------------------- */
	$("#menu_bar").menuBar( {
	
		/* ------------------------------ */
		/*  Funktion: onShowWikisClicked  */
		/* ------------------------------ */
		onShowWikisClicked: function() {
//DEBUG
alert("wiki.application.js\n# onShowWikisClicked:\n# .wiki_details.hide\n# .wiki_list.show\n# .wiki_list.reload");
//DEBUG
			$("#wiki_details").hide();
			$("#wiki_list").show();
			$("#wiki_list").wikiList("reload");
		},
		
		/* ------------------------------- */
		/*  Funktion: onCreateWikiClicked  */
		/* ------------------------------- */
		onCreateWikiClicked: function() {
//DEBUG
alert("wiki.application.js\n# onCreateWikiClicked:");
//DEBUG
			$("#create_dialog").createDialog("open");
		}
		
	});

	
	
	/* ----------------------------------------------------- */
	/*  Instanziierung "wiki.deletedialog.js" .deleteDialog  */
	/* ----------------------------------------------------- */
	$("#delete_dialog").deleteDialog( {									// Instanzierung des Widgets für den Löschdialog
		onWikiDeleted: function() {
	//DEBUG
	alert("wiki.application.js\n # onWikiDeleted: .wikiList(reload)");
	//DEBUG
	
			$("#wiki_list").wikiList("reload");		
		}
	});

	
	
	/* ----------------------- */
	/*  Widget: wikiStatistic  */
	/* ----------------------- */
	$("#wiki_statistic").wikiStatistic();
	
	
		
	/* --------------------------------------------- */
	/*  Instanziierung "wiki.wikilist.js" .wikiList  */
	/* --------------------------------------------- */
	$("#wiki_list").wikiList( {
		
		/* ----------------------------- */
		/*  onWikiClicked - wikiDetails  */
		/* ----------------------------- */
		onWikiClicked: function(event, wikiUrl) {
//DEBUG
alert("wiki.application.js\n # onWikiClicked: wikiDetails(load, wikiUrl)");
//DEBUG
			$("#wiki_list").hide();										
			$("#wiki_details").show();
			$("#wiki_details").wikiDetails("load", wikiUrl);			// Anzeigen eines einzelnen Wikis
		},
		
		/* ------------------------------ */
		/*  onWikiClicked - deleteDialog  */
		/* ------------------------------ */
		onDeleteWikiClicked: function(event, wiki) {
//DEBUG
alert("wiki.application.js\n # onDeleteWikiClicked: deleteDialog(open)");
//DEBUG
			$("#delete_dialog").deleteDialog("open", wiki);				// Anzeigen des Löschen Dialogs
		},
		
		/* -------------------------------- */
		/*  onEditWikiClicked - editDialog  */
		/* -------------------------------- */
		onEditWikiClicked: function(event, wiki) {
//DEBUG
alert("wiki.application.js\n # onEditWikiClicked: editDialog(open, wiki)");
//DEBUG
			$("#edit_dialog").editDialog("open", wiki);					// Anzeigen des Bearbeiten Dialogs durch "open", Übergabe der Ereignis-Parameter mit "wiki"
		},
		
		/* ------------------------------ */
		/*  onWikiPageClicked - wikiList  */
		/* ------------------------------ */
		onWikiPageClicked: function(event, pagenumber) {						// pagenumber nimmt event.data (den Text) des <a class="page" href="#"> entgegen.
			
//DEBUG
alert(pagenumber);
alert("wiki.application.js\n # onWikiPageClicked: wikiList(reload, pagenumber)");
//DEBUG

			$("#wiki_list").wikiList("reload", pagenumber);							
			
		},
	});																	


	
	/* -------------------------------------- */
	/*  Instanziierung "wiki.wikiDetails.js"  */
	/* -------------------------------------- */
	$("#wiki_details").wikiDetails();

	
		
	/* ------------------------------------- */
	/*  Instanziierung "wiki.editdialog.js"  */
	/* ------------------------------------- */
	$("#edit_dialog").editDialog( {										// Das # versteckt das HTML Element beim ersten Aufruf
		onWikiEdited: function() {	
//DEBUG
alert("wiki.application.js\n # onWikiEdited: .wikiList(reload)");
//DEBUG		
			$("#wiki_list").wikiList("reload");							// Reload der Seite - Aufruf aus "wiki.editdialog.js"
		}
	});
		
	/* ------------------------------------- */
	/*  Instanziierung "wiki.createdialog.js"  */
	/* ------------------------------------- */
	$("#create_dialog").createDialog( {										// Das # versteckt das HTML Element beim ersten Aufruf
		onWikiCreated: function() {	
//DEBUG
alert("wiki.application.js\n # onWikiCreated: .wikiList(reload)");
//DEBUG		
			$("#wiki_list").wikiList("reload");						// Reload der Seite - Aufruf aus "wiki.createdialog.js"
		}
	});
	
});

