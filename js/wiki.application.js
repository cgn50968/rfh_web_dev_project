$(function() {
/* -------------------------------------- */
/* CONTROL - Zentrale Steuerungsfunktion  */
/* -------------------------------------- */

/* ---------------- */
/*  ERROR HANDLING  */
/* ---------------- */
	$(document).ajaxError(function(event, request) {					// Gibt den Response Status Text bei Fehlern wieder.
//DEBUG
alert("wiki.application.js\n # .ajaxError");
//DEBUG
		$("#error_dialog").errorDialog("open", request.statusText);		// Methode Open des Error Dialogs (Wiedergabe des Request Status über request.statusText
		$("#wiki_details").hide();										// Bei Fehler #wiki_details nicht anzeigen
		$("#wiki_list").show();											// Bei Fehler #wiki_list wieder anzeigen
		
		if (request.status == 404) {									// Reload der #wiki_list bei Fehlercode 404
			$("#wiki_list").wikiList("reload");
		}
	});
	
/* ------------------------------------- */
/*  <<-- INSTANZIIERUNG DER WIDGETS -->> */
/* ------------------------------------- */
	
	
	
	/* ----------------------------------------------------------- */
	/*  ERROR - Instanziierung "wiki.errordialog.js" .errorDialog  */
	/* ----------------------------------------------------------- */
	$("#error_dialog").errorDialog();									// Instanzierung des Widgets für Fehlerbehandlung
	

	
	/* ----------------------------- */
	/*  HEADER - Widget: wikiHeader  */
	/* ----------------------------- */
	$("#wiki_header").wikiHeader();
	

	
	/* ----------------------------- */
	/*  FOOTER - Widget: wikiFooter  */
	/* ----------------------------- */
	$("#wiki_footer").wikiFooter();
	
	
	
	/* ----------------------------------- */
	/*  STATISTIC - Widget: wikiStatistic  */
	/* ----------------------------------- */
	$("#wiki_statistic").wikiStatistic();


	
	/* -------------------------------------------------- */
	/*  CONTACT - Instanziierung "wiki.contactdialog.js"  */
	/* -------------------------------------------------- */
	$("#contact_dialog").contactDialog();
		
	
		
	/* ------------------------------------------------ */
	/*  DETAILS - Instanziierung "wiki.wikiDetails.js"  */
	/* ------------------------------------------------ */
	$("#wiki_details").wikiDetails();	
	
	
	
	/* ----------------------------------------------------- */
	/*  MENUBAR - Instanziierung "wiki.menubar.js" .menuBar  */
	/* ----------------------------------------------------- */
	$("#menu_bar").menuBar( {
	
		/* ------------------------------ */
		/*  Funktion: onShowWikisClicked  */
		/* ------------------------------ */
		onShowWikisClicked: function() {
//DEBUG
alert("wiki.application.js\n# onShowWikisClicked:\n# .wiki_details.hide\n# .wiki_list.show\n# .wiki_list.reload");
//DEBUG
			$("#wiki_details").hide();
			$("#page_number").pageNumber("reload");
			$("#wiki_list").wikiList("reload");
			$("#wiki_header").show();
			$("#wiki_footer").show();
			$("#wiki_list").show();
			$("#page_number").show();
		},
		
		/* ------------------------------- */
		/*  Funktion: onCreateWikiClicked  */
		/* ------------------------------- */
		onCreateWikiClicked: function() {
//DEBUG
alert("wiki.application.js\n# onCreateWikiClicked:");
//DEBUG
			$("#create_dialog").createDialog("open");
			
		},
		
		/* ------------------------------ */
		/*  Funktion: onShowContactClicked  */
		/* ------------------------------ */
		onShowContactClicked: function(event) {
//DEBUG
alert("wiki.application.js\n# onShowContactClicked:");
//DEBUG
			$("#contact_dialog").contactDialog("open");
		}
		
	});



	/* -------------------------------------------------------- */
	/*  WIKILIST - Instanziierung "wiki.wikilist.js" .wikiList  */
	/* -------------------------------------------------------- */
	$("#wiki_list").wikiList( {
		
		/* ----------------------------- */
		/*  onWikiClicked - wikiDetails  */
		/* ----------------------------- */
		onWikiClicked: function(event, wikiUrl) {
//DEBUG
alert("wiki.application.js\n # onWikiClicked: wikiDetails(load, wikiUrl)");
//DEBUG
			$("#wiki_header").hide();
			$("#wiki_footer").hide();
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
		
	});				


	
	/* ---------------------------------------------- */
	/*  SEARCH - Instanziierung "wiki.wikisearch.js"  */
	/* ---------------------------------------------- */
	$("#wiki_search").wikiSearch( {
	
		/* ---------------------- */
		/*  onSearchWikisClicked  */
		/* ---------------------- */
		onSearchWikisClicked: function() {
	//DEBUG
	alert("wiki.wikisearch.js\n # onSearchWikisClicked:");
	//DEBUG
			$("#page_number").hide();
			$("#wiki_details").hide();
			$("#wiki_search").wikiSearch("gotoWikiSearchResult");
			$("#wiki_list").show();
			$("#wiki_header").show();
			$("#wiki_footer").show();
		}
	
	});
	
	
	
	/* -------------------------------------------------------------- */
	/*  DELETE - Instanziierung "wiki.deletedialog.js" .deleteDialog  */
	/* -------------------------------------------------------------- */
	$("#delete_dialog").deleteDialog( {									// Instanzierung des Widgets für den Löschdialog
		onWikiDeleted: function() {
	//DEBUG
	alert("wiki.application.js\n # onWikiDeleted: .wikiList(reload)");
	//DEBUG
			$("#wiki_statistic").wikiStatistic("reload");
			$("#page_number").pageNumber("reload");
			$("#wiki_list").wikiList("reload");	
			$("#wiki_list").show();
			$("#page_number").show();			
		}
	});

	

	/* -------------------------------------------- */
	/*  EDIT - Instanziierung "wiki.editdialog.js"  */
	/* -------------------------------------------- */
	$("#edit_dialog").editDialog( {										// Das # versteckt das HTML Element beim ersten Aufruf
		onWikiEdited: function() {	
//DEBUG
alert("wiki.application.js\n # onWikiEdited: .wikiList(reload)");
//DEBUG		

			$("#wiki_statistic").wikiStatistic("reload");
			$("#page_number").pageNumber("reload");
			$("#wiki_list").wikiList("reload");	
			$("#wiki_list").show();
			$("#page_number").show();
		}
	});
		
		
		
	/* ------------------------------------------------ */
	/*  CREATE - Instanziierung "wiki.createdialog.js"  */
	/* ------------------------------------------------ */
	$("#create_dialog").createDialog( {										// Das # versteckt das HTML Element beim ersten Aufruf
		onWikiCreated: function() {	
//DEBUG
alert("wiki.application.js\n # onWikiCreated: .wikiList(reload)");
//DEBUG	1	

			$("#wiki_details").hide();
			$("#wiki_statistic").wikiStatistic("reload");
			$("#page_number").pageNumber("reload");
			$("#wiki_list").wikiList("reload");								// Reload der Seite - Aufruf aus "wiki.createdialog.js"
			$("#wiki_list").show();
			$("#wiki_header").show();
			$("#wiki_footer").show();
			$("#page_number").show();
		}
	});


	
	/* ------------------------------- */
	/*  PAGINATE - Widget: pageNumber  */
	/* ------------------------------- */
	$("#page_number").pageNumber( {
	
		/* ------------------- */
		/*  onWikiPageClicked  */
		/* ------------------- */
		onWikiPageClicked: function(event, pagenumber) {						// pagenumber nimmt event.data (den Text) des <a class="page" href="#"> entgegen.
			
//DEBUG
alert(pagenumber);
alert("wiki.application.js\n # onWikiPageClicked: pageNumber(reload)");
alert("wiki.application.js\n # onWikiPageClicked: wikiList(reload, pagenumber)");
//DEBUG

			$("#wiki_details").hide();
			$("#wiki_list").show();
			$("#page_number").pageNumber("reload");	
			$("#wiki_list").wikiList("reload", pagenumber);							
		},
	});
		
});

