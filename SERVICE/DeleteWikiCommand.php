<?php
/* --------------------------------------------------------------------- */
/* <<-- class: DeleteWikiCommand -->>                                    */	
/* --------------------------------------------------------------------- */

	class DeleteWikiCommand {
	
		public function execute($request) {
	
			$id = $request["id"];								// Ermittlung der ID aus dem REQUEST
			
			$wiki_service = new WikiService();					// Konstruktor - neues Objekt WikiService 
			
			$result = $wiki_service->deleteWiki($id);			// Funktionaufruf WikiService.deleteWiki()
			
			if($result == WikiService::NOT_FOUND) {				// Fehlermeldung, sofern Datensatz nicht gefunden wurde
				header("HTTP/1.1 404");
				return "NOT DELETED";
			} 
			else {
				return "DELETED";
			}
		}
	}
	
?>