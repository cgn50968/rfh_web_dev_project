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
		
//DEBUG
alert("wiki.wikistatistic.js\n # _create:");
//DEBUG

		/* 1. HTML GET Anfrage - GetWikisCommand - countWikis */
		$.ajax({
			url: "/wiki/service/wikis",				
			dataType: "json",
			success: this._appendStatistic,
			context: this,
		});
		
//DEBUG
alert("wiki.wikistatistic.js\n # _appendStatistic:");
//DEBUG

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

		this.element.find(".articles").remove();							// altes Widget entfernen
		
//DEBUG
alert("wiki.wikistatistic.js\n # _create:");
//DEBUG

		/* 1. HTML GET Anfrage - GetWikisCommand - countWikis */
		$.ajax({
			url: "/wiki/service/wikis",				
			dataType: "json",
			success: this._appendStatistic,
			context: this,
		});
		
//DEBUG
alert("wiki.wikistatistic.js\n # _appendStatistic:");
//DEBUG

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
	