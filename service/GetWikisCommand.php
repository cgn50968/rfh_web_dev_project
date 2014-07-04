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
			$wiki->url = "/rfh_web_dev_project/service/wikis/$wiki->id"; 
			unset($wiki->id);										// Löscht das Attribut aus dem Objekt
		}
		
		return $wikis;
	}
}