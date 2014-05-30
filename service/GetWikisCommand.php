<?php

/* Auslesen aller Wiki Einträge */

class GetWikisCommand {
	public function execute() {
		
		$wiki_service = new WikiService();							// Konstruktor - neues Objekt: WikiService
	
		$wikis = $wiki_service->readWikis();						// Funktionsaufruf: readWiki()
		
		if($wikis == WikiService::ERROR) {							// Gibt Fehlercode 500 an Browser zurück...
			header("HTTP/1.1 500");
			return;													// Beendung der Verarbeitung
			}
		
		foreach($wikis as $wiki) {									// Zuweisen einer URL pro ID
			$wiki->url = "/service/wikis/$wiki->id"; 
			unset($wiki->id);										// Löscht das Attribut aus dem Objekt
		}
		
		return $wikis;
	}
}