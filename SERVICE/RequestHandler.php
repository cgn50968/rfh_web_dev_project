<?php
/* ------------------------------------------------------ */
/* <<-- RequestHandler: Zentrale Verarbeitungsklasse -->> */
/* ------------------------------------------------------ */

/* ------------------------------------------------------- */
/* <<-- Einbindung zusätzlicher PHP Dateien (Klassen) -->> */	
/* ------------------------------------------------------- */
	require "Wiki.php";
	require "GetWikisCommand.php";
	require "GetWikiCommand.php";
	require "CreateWikiCommand.php";
	require "CreateWikiResult.php";
	require "WikiService.php";
	require "HtmlPage.php";
	
/* ------------------------------------------------------- */
/* <<-- Klasse: RequestHandler -->>                        */	 
/* ------------------------------------------------------- */

	class RequestHandler {
	
		/* Die Funktion handleRequest() erwartet, dass die angegebene Klasse eine Funktion execute() besitzt. */
	
		public function handleRequest() {
			$request = $_REQUEST;						// Übergabe der POST Argumente an $request
						
			$class_name = $request["command"];			// Auslesen des Klassennamens in $class_name
			
			$command = new $class_name;					// Klassenobjekt erstellen
		
			$result = $command->execute($request);		// Ausführen der Funktion execute()
			
			if($result !== NULL) {						// Falls die Rückgabe ungleich NULL ist (!== bedeutet, dass nur NULL den Fehler erzeugt)
			
			//	Testbereich...
			
				$html_page = new HtmlPage;				// Klassenobjekt erstellen
				
				if(isset($_REQUEST["edit"])) {			// Falls Anfrage = cancel > dann öffnen der Seite TodoList.php */
					header("Location: RequestHandler.php");
					$html_page->editDetails($result);	
					}
					
				//$html_page->writeHtmlHeader();
				//$html_page->writeTable($result);
				//$html_page->showDetails($result);
				
				//if(isset($_REQUEST["edit"])) {		/* wie kann abgefragt werden, dass der Edit Button gedrückt wurde? */
				//	$html_page->editDetails($result);	
				//	}
					
				//$html_page->writeHtmlBottom();
			
			//	Ende - Testbereich!
			
				echo(json_encode($result));				// Ausgabe als "JSON-Zeichenkette"
				
			}
		}
	}

/* --------------------------------------------------------------------- */
/* <<-- Programmaufruf -->>                                              */	
/* --------------------------------------------------------------------- */

	$request_handler = new RequestHandler();			// Klassen-Objekt instanzieren (erstellen)
	
	$request_handler->handleRequest(); 					// Aufruf der zentralen Funktion "handleRequest()"

/* --------------------------------------------------------------------- */
/* <<-- Infobereich -->>                                                 */	
/* --------------------------------------------------------------------- */

/*
	Programmaufruf:		http://localhost/rfh_dev_project/service/RequestHandler.php?command=[class_name] 
*/
?>