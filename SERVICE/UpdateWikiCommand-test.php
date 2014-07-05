<?php

/* --------------------------------------------------------------------- */
/* <<-- class: UpdateWikiCommand -->>                                    */	
/* --------------------------------------------------------------------- */

	class UpdateWikiCommand {
	
		public function execute($request, $request_headers) {
		//public function execute($request) {
			echo $request["title"];
			return $request;
			//return "updated";
		}
		
	}	
?>