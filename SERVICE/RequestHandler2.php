<?php

	// Einbindung - wiki.php
	require "wiki.php";
	
	
	// Java * - Definition eines Konstruktors mit der Funktion construct() möglich
	class RequestHandler {
		public function handleRequest() {
			$wiki = new Wiki();							// Konstruktor - Erzeugung des Objekts "Wiki"
			// $wiki = $command->execute();				// Übergabe des Ergebnisses an Array
			
			//Formatierung in JSON Zeichkette
			if($wiki !== NULL) {						// Falls die Rückgabe ungleich NULL ist (!== bedeutet, dass nur NULL den Fehler erzeugt)
				echo(json_encode($todos));				// formatiert insbesondere Objekte und Arrays als JSON-Zeichenkette
			}
		}
	}
	
	// Objekt instanzieren (erstellen)
	$request_handler = new RequestHandler();
	
	// Aufruf der Methode eines Objekts ebenfalls per Pflei-Opterator
	$request_handler->handleRequest();
	
?>