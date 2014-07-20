<?php
/* ------------------------------------ */
/* <<-- class: SearchWikisCommand -->>  */
/* ------------------------------------ */

class SearchWikisCommand {
	
	public function execute($request) {
		
		/* ------------ */
		/*  WikiSearch  */
		/* ------------ */
		$wiki_service = new WikiService();							// Konstruktor - neues Objekt: WikiService
		
		$wikis = $wiki_service->searchWikis();						// Funktionsaufruf: searchWikis()
		
		if($wikis == WikiService::ERROR) {							// Fehlercode 500, sofern in WikiService die DB Verbdindung fehlgeschlagen ist.
			header("HTTP/1.1 500");
			return;													// Beendung der Verarbeitung
		}
			

								
		/* ------------------------------------------------ */
		/*  Zuweisung der URL und Seitenzahl pro Datensatz  */
		/* ------------------------------------------------ */
		foreach($wikis as $wiki) {									// Zuweisen einer URL pro ID
			
			$wiki->url = "/wiki/service/wikis/$wiki->id";
			
			/* --------------------------- */
			/*  Berechnung der Gültigkeit  */
			/* --------------------------- */
			$expiration_date = date_create($wiki->expiration_date);
			$today = date_create($wiki->today);
			$difference = date_diff($today, $expiration_date);
			$wiki->days_to_go = $difference->format('%R%a Tag(e)'); 
			
			unset($wiki->id);										// Löscht das Attribut aus dem Objekt
		}
		return $wikis;
	}
}

?>