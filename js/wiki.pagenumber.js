/* ------------------ */
/*  Widget: pageNumber  */
/* ------------------ */
								
$.widget("wiki.pageNumber", {  																

	/* ------------------ */
	/* Function: _create  */
	/* ------------------ */
	_create: function() {																	
	
		/* ----------------------------- */
		/*  Paramenter für POST Methode  */
		/* ----------------------------- */
		
		var wiki = {									
			postMethod: "get", 
		};
		
//DEBUG
alert("wiki.pagenumber.js\n # _create:");
//DEBUG

		//this.element.find(".pages").remove();							// altes Widget entfernen


		/* 1. HTML Anfrage - PageSize */
		$.ajax({
			url: "/wiki/service/wikis",				
			dataType: "json",
			success: this._setPageList,
			context: this,
		});
		
//DEBUG
alert("wiki.pagenumber.js\n # _create: pageNumber: _setPageList");
//DEBUG
		
	},

	
	
	/* ----------------- */
	/* Function: reload  */
	/* ----------------- */	
	reload: function() {																	
	
		/* ----------------------------- */
		/*  Paramenter für POST Methode  */
		/* ----------------------------- */
		
		var wiki = {									
			postMethod: "get", 
		};
		
//DEBUG
alert("wiki.pagenumber.js\n # _create:");
//DEBUG

		this.element.find(".wiki:not(.pages)").remove();			// es müssen zwei Klassen vergeben werden, damit remove funktioniert
		
		/* 1. HTML Anfrage - PageSize */
		$.ajax({
			url: "/wiki/service/wikis",				
			dataType: "json",
			success: this._setPageList,
			context: this,
		});
		
//DEBUG
alert("wiki.pagenumber.js\n # _create: pageNumber: _setPageList");
//DEBUG
		
	},
	
	
	
	/* ------------------------ */
	/*  Function: _setPageList  */
	/* ------------------------ */
	_setPageList: function(pagedata) {
		var that = this;
		
		var pageNum = pagedata["pagenum"];													// Anzahl der Seiten
		var pageCount = pagedata["count"];													// Anzahl der Datensätze

		var pageText = 1;

		for(var i = 0; i < pageNum; i++) {
			
			var wikiElement = this.element.find(".pages").clone().removeClass("pages");	

			/* WICHTIG! Entfernen des alten Widgets bevor ein neues erstellt wird. */
				
			wikiElement.find(".page").text(pageText);										// text setzen: Beschreibung
			wikiElement.find(".page").val(pageText);
			
			wikiElement.find(".page").click(pageText, function(event) {
				that._trigger("onWikiPageClicked", null, event.data);						// event.data übergibt Parameter des Page Objects
			});
			this.element.append(wikiElement);												// Element anfügen
			
			pageText = pageText + 1;
		}
	},

});		
