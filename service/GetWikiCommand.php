<?php

	class GetWikiCommand {
		public function execute($request) {
			if(isset($request["id"]) == FALSE) {			// isset überprüft, ob variable gesetzt ist...
				header("HTTP/1.1 400");						// header setzt den Fehlercode, Falls ein Fehler auftritt
				return;
				}

			$id = $request["id"];
			// Konstruktor - neues Klassenobjekt TodoService
			$wiki_service = new WikiService();
			// Speichern des Ergebnisses der Funktions readTodos in $todo
			$wiki = $wiki_service->readWiki($id);
			// Variable id wieder leeren und nicht mit ausgeben
			unset($wiki->id);
			
			//Etag header setzen - Für die Kontrolle der Version
			header("Etag: $wiki->version");
			//Etag wieder leeren
			unset($wiki->version);
			
			// Rückgabe des Arrays
			return $wiki;
		}
	}


?>