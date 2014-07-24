/* ----------------------- */
/*  Widget: wikiStatistic  */
/* ----------------------- */		
$.widget("wiki.wikiStatistic", {  	

	/* ------------------ */
	/* Function: _create  */
	/* ------------------ */
	_create: function() {																	
	
		/* -------------- */
		/*  HTML Methode  */
		/* -------------- */
		var wiki = {									
			postMethod: "get", 
		};

		/* 1. HTML GET Anfrage - GetWikisCommand - countWikis */
		$.ajax({
			url: "/wiki/service/wikis",				
			dataType: "json",
			success: this._appendStatistic,
			context: this,
		});
	},


	
	/* ------------------ */
	/* Function: _create  */
	/* ------------------ */
	reload: function() {																	
	
		/* -------------- */
		/*  HTML Methode  */
		/* -------------- */
		var wiki = {									
			postMethod: "get", 
		};

		this.element.find(".article").empty();												// TAG <p class="article"> leeren

		/* 1. HTML GET Anfrage - GetWikisCommand - countWikis */
		$.ajax({
			url: "/wiki/service/wikis",				
			dataType: "json",
			success: this._appendStatistic,
			context: this,
		});
	},
	
	
	
	/* --------------------------- */
	/* Function: _appendStatistic  */
	/* --------------------------- */	
	_appendStatistic: function(pagedata) {
		
		/* Artikeltext */
		var articleNum = "Anzahl der Beiträge: " + pagedata["count"];						// pagedata["count"] = Anzahl der Datensätze
		
		/* Zuweisung des Wertes */
		var wikiElement = this.element.find(".articles").clone().removeClass("articles");
		wikiElement.find(".article").text(articleNum);
		this.element.append(wikiElement);
	},

});
	