<?php

/* --------------------------------------------------------------------- */
/* <<-- class: GetWikisCommand -->>                                    */	
/* --------------------------------------------------------------------- */

class GetWikisCommand {
	public function execute() {
		
		$wiki_service = new WikiService();							// Konstruktor - neues Objekt: WikiService
	
		$wikis = $wiki_service->readWikis();						// Funktionsaufruf: readWiki()
		
		if($wikis == WikiService::ERROR) {							// Fehlercode 500, sofern in WikiService die DB Verbdindung fehlgeschlagen ist.
			header("HTTP/1.1 500");
			return;													// Beendung der Verarbeitung
			}
		
		//---------------------------------
		// Zuweisung der URL pro Datensatz
		//---------------------------------
		foreach($wikis as $wiki) {									// Zuweisen einer URL pro ID
						
			$wiki->url = "/wiki/service/wikis/$wiki->id";
			
			//DEBUG
				$wiki->debug = "GET > GetWikisCommand.php > RequestHandler.php";
			//DEBUG END
			
			unset($wiki->id);										// Löscht das Attribut aus dem Objekt
		}
		
		return $wikis;
	}
}