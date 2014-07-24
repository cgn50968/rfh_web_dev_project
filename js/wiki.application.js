$(function() {
/* -------------------------------------- */
/* CONTROL - Zentrale Steuerungsfunktion  */
/* -------------------------------------- */

/* ---------------- */
/*  ERROR HANDLING  */
/* ---------------- */
	$(document).ajaxError(function(event, request) {					// Gibt den Response Status Text bei Fehlern wieder.
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
	$("#error_dialog").errorDialog();									
	

	
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
			$("#create_dialog").createDialog("open");
			
		},
		
		
		/* ------------------------------ */
		/*  Funktion: onShowContactClicked  */
		/* ------------------------------ */
		onShowContactClicked: function(event) {
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
			$("#delete_dialog").deleteDialog("open", wiki);				// Anzeigen des Löschen Dialogs
		},
		
		
		/* -------------------------------- */
		/*  onEditWikiClicked - editDialog  */
		/* -------------------------------- */
		onEditWikiClicked: function(event, wiki) {
			$("#edit_dialog").editDialog("open", wiki);					
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
	$("#delete_dialog").deleteDialog( {								
		onWikiDeleted: function() {
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
	$("#edit_dialog").editDialog( {										
		onWikiEdited: function() {	
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
	$("#create_dialog").createDialog( {										
		onWikiCreated: function() {	
			$("#wiki_details").hide();
			$("#wiki_statistic").wikiStatistic("reload");
			$("#page_number").pageNumber("reload");
			$("#wiki_list").wikiList("reload");								
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
			$("#wiki_details").hide();
			$("#page_number").pageNumber("reload");	
			$("#wiki_list").wikiList("reload", pagenumber);
			$("#wiki_list").show();
			$("#wiki_header").show();
			$("#wiki_footer").show();		
		},
	});
		
});

