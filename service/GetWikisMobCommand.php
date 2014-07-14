<?php

/* --------------------------------- */
/* <<-- class: GetWikisMobCommand -->>  */	
/* --------------------------------- */

class GetWikisMobCommand {
	public function execute($request) {

	
		/* ------------- */
		/*  WikiService  */
		/* ------------- */
		$wiki_service = new WikiService();							// Konstruktor - neues Objekt: WikiService
		
		
		/* ----------------------- */
		/*  Anzahl der Datensätze  */
		/* ----------------------- */
		if($_SERVER["REQUEST_METHOD"] == "GET") {
						
			/* ----------- */
			/*  readWikis  */
			/* ----------- */
			$wikis = $wiki_service->readWikisMob();	// Funktionsaufruf: readWikis()
			
				if($wikis == WikiService::ERROR) {							// Fehlercode 500, sofern in WikiService die DB Verbdindung fehlgeschlagen ist.
					header("HTTP/1.1 500");
					return;													// Beendung der Verarbeitung
					}
								
			/* ------------------------------------------------ */
			/*  Zuweisung der URL und Seitenzahl pro Datensatz  */
			/* ------------------------------------------------ */
			foreach($wikis as $wiki) {									// Zuweisen einer URL pro ID
							
				$wiki->url = "/wiki/service/wikis/$wiki->id";									
				
				unset($wiki->id);										// Löscht das Attribut aus dem Objekt
			}
			return $wikis;
		}
		
		
	}
}
?>