<?php

/* --------------------------------------------------------------------- */
/* <<-- class: UpdateWikiCommand -->>                                    */	
/* --------------------------------------------------------------------- */

	class UpdateWikiCommand {
	
		public function execute($request, $request_headers) {
		//public function execute($request) {
			
			
			$wiki = new Wiki();
			
		/* ------------------------------------------------ */	
		/* <<-- Übergabe der neuen Werte -->>               */
		/* ------------------------------------------------ */
		
		/*
			if(isset($request["category"]) == TRUE) {		// Wurde die Kategorie gesetzt?
				$wiki->category = $request["category"];
				}
			if(isset($request["title"]) == TRUE) {			// Wurde der Titel gesetzt?
				$wiki->title = $request["title"];
				}
			//if(isset($request["author"]) == TRUE) {			// Wurde der Autor gesetzt?
				//$wiki->author = $request["author"];
				//}
			if(isset($request["notes"]) == TRUE) {			// Wurde der Text gesetzt?
				$wiki->notes = $request["notes"];
				}
			if(isset($request["id"]) == TRUE) {				// Wurde die ID gesetzt?
				$wiki->id = $request["id"];
				}
				*/

			$wiki->id = $request["id"];
			//$wiki->category = $request["category"];	
			$wiki->title = $request["title"];
			$wiki->notes = $request["notes"];
			$wiki->version = $request_headers["If-Match"];	// Setzen, falls die Versionsnummern übereinstimmen.
			
			$wiki_service = new WikiService();				// Konstruktor - neues Objekt WikiService 
			$result = $wiki_service->updateWiki($wiki);		// Aufruf der Funktion updateWiki()
		
			if($result == WikiService::VERSION_OUTDATED) {	// Falls sich die Versionsnummern bereits geändert hat.
				header("HTTP/1.1 412");
			}
			if($result == WikiService::NOT_FOUND) {			// Falls der Datensatz nicht gefunden werden konnte.
				header("HTTP/1.1 404");
			
			return "updated";								// TEST-Ausgabe
			}
		}
	}
	
?>