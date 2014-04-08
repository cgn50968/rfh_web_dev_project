<?php

	/* RequestHandler: Zentrale Verarbeitungsfunktion */


	/* Einbindung der einzelnen Klassen */
	require "Wiki.php";
	require "GetWikisCommand.php";
	require "WikiService.php";
	require "table.php";
	
	// Java * - Definition eines Konstruktors mit der Funktion construct() möglich
	class RequestHandler {
		public function handleRequest() {
			$command = new GetWikisCommand();			// zentrale Funktionssteuerung - Ausführung von Unterfunktionen
			$wikis = $command->execute();				// Ausführung der Funktion execute().
														// Jede eingebundene Klasse muss hierzu eine Standardfunktion execute() besitzten.
			
			if($wikis !== NULL) {						// Falls die Rückgabe ungleich NULL ist (!== bedeutet, dass nur NULL den Fehler erzeugt)
				//echo(json_encode($wikis));				// AUSGABE: formatiert insbesondere Objekte und Arrays als JSON-Zeichenkette
				writeTable($wikis);
				
			}
		}
	}
	
	// Objekt instanzieren (erstellen)
	$request_handler = new RequestHandler();
	
	// Aufruf der Methode eines Objekts ebenfalls per Pflei-Opterator
	$request_handler->handleRequest();
	
?>