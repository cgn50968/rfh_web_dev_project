<?php

	/* RequestHandler: Zentrale Verarbeitungsklasse */


	/* Einbindung der einzelnen Klassen */
	require "Wiki.php";
	require "GetWikisCommand.php";
	require "WikiService.php";
	require "HtmlPage.php";
	
	
	class RequestHandler {
	
	/* PROGRAMMAUFRUF:	http://localhost/rfh_dev_project/service/RequestHandler.php?command=[class_name] 
	
		Die Funktion handleRequest() erwartet, dass die angegebene Klasse eine Funktion execute() besitzt. */
	
		public function handleRequest() {
			$request = $_REQUEST;						// Übergabe der POST Argumente an $request
						
			$class_name = $request["command"];			// Auslesen des Klassennamens in $class_name
			
			$command = new $class_name;					// Klassenobjekt erstellen
		
			$result = $command->execute($request);		// Ausführen der Funktion execute()
			
			if($result !== NULL) {						// Falls die Rückgabe ungleich NULL ist (!== bedeutet, dass nur NULL den Fehler erzeugt)
				//echo(json_encode($result));				// AUSGABE: als JSON-Zeichenkette
				$html_page = new HtmlPage;
				
				$html_page->writeHtmlHeader();
				$html_page->writeTable($result);
				$html_page->writeHtmlBottom();
			}
		}
	}
	
	// Objekt instanzieren (erstellen)
	$request_handler = new RequestHandler();
	
	// Aufruf der Methode eines Objekts ebenfalls per Pflei-Opterator
	$request_handler->handleRequest();
	
?>