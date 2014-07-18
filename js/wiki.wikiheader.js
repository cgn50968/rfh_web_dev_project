/* -------------------- */
/*  Widget: wikiHeader  */
/* -------------------- */
							
$.widget("wiki.wikiHeader", {  	

	_create: function() {
		var that = this;
		var wikiElement = this.element.find(".wikiheader").clone().removeClass("wikiheader");
		this.element.append(wikiElement);
		alert("Header");
	}
});
	