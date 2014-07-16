/* -------------------- */
/*  Widget: wikiFooter  */
/* -------------------- */
							
$.widget("wiki.wikiFooter", {  	

	_create: function() {
		var that = this;
		var wikiElement = this.element.find(".wikifooter").clone().removeClass("wikifooter");
		this.element.append(wikiElement);
	}
});
	