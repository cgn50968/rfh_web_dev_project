<?php

/* --------------------------------- */
/* <<-- class: GetWikisCommand -->>  */	
/* --------------------------------- */

class GetWikisCommand {
	public function execute($request) {

	
		/* ------------- */
		/*  WikiService  */
		/* ------------- */
		$wiki_service = new WikiService();							// Konstruktor - neues Objekt: WikiService
		
		
		/* ----------------------- */
		/*  Anzahl der Datensätze  */
		/* ----------------------- */
		if($_SERVER["REQUEST_METHOD"] == "GET") {
		
			/* ------------ */
			/*  countWikis  */
			/* ------------ */
			$count = $wiki_service->countWikis();						// Anzahl der Datensätze
			
			$pages = $count/5;
			settype($pages, "integer");

			$divisor = 5 * $pages;										// Summe der Datensäte ($pages ohne Nachkommastelle)
			
			if($count > $divisor) {										// Ist die Anzahl der Datensätze größer $divisor?
				$pages = $pages + 1;									// Wenn ja, Seitenzahl um 1 erhöhen
			}
		return $pages;
		}
		
		
		/* ----------------------- */
		/*  Anzahl der Datensätze  */
		/* ----------------------- */
		if($_SERVER["REQUEST_METHOD"] == "POST") {
			
			if(isset($request["pageFrom"]) == TRUE) {					// wurde pageFrom gesetzt?
					$pageFrom = $request["pageFrom"];
				}

			if(isset($request["pageResults"]) == TRUE) {				// wurde pageResults gesetzt?
					$pageResults = $request["pageResults"];
				}
			
			/* ----------- */
			/*  readWikis  */
			/* ----------- */
			$wikis = $wiki_service->readWikis($pageFrom, $pageResults);	// Funktionsaufruf: readWikis()
			
				if($wikis == WikiService::ERROR) {							// Fehlercode 500, sofern in WikiService die DB Verbdindung fehlgeschlagen ist.
					header("HTTP/1.1 500");
					return;													// Beendung der Verarbeitung
					}
								
			/* ------------------------------------------------ */
			/*  Zuweisung der URL und Seitenzahl pro Datensatz  */
			/* ------------------------------------------------ */
			foreach($wikis as $wiki) {									// Zuweisen einer URL pro ID
							
				$wiki->url = "/wiki/service/wikis/$wiki->id";
				//$wiki->pages = $pages;									
				
				unset($wiki->id);										// Löscht das Attribut aus dem Objekt
			}
			return $wikis;
		}
		
		
	}
}
?>