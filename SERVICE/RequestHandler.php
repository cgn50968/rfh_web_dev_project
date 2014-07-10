<?php
/* ------------------------------------------------------ */
/* <<-- RequestHandler: Zentrale Verarbeitungsklasse -->> */
/* ------------------------------------------------------ */

	/* ------------------------------------------------------- */
	/* <<-- Einbindung zusätzlicher PHP Dateien (Klassen) -->> */	
	/* ------------------------------------------------------- */
	require "wiki.php";
	require "wikiService.php";
	require "GetWikiCommand.php";
	require "GetWikisCommand.php";
	require "CreateWikiCommand.php";
	require "UpdateWikiCommand.php";
	require "DeleteWikiCommand.php";
	require "CreateWikiResult.php";
	require "SearchWikisCommand.php";
	
	
	/* --------------------------------- */
	/* <<-- Klasse: RequestHandler -->>  */	 
	/* --------------------------------- */
	class RequestHandler {
	
		/* Die Funktion handleRequest() erwartet, dass die angegebene Klasse eine Funktion execute() besitzt. */
	
		public function handleRequest() {
			
			$request = $_REQUEST;										// Übergabe der POST Argumente an $request

			/* ---------------- */
			/*  POST - Methode  */
			/* ---------------- */
			if ($_SERVER["REQUEST_METHOD"] == "POST") {
				
				if ($request["postMethod"] == "") {
					header("HTTP/1.1 400");
					$validation_messages = array();
					$validation_messages["title"] = "Keine postMethod gesetzt.";
					echo json_encode($validation_messages);
					return;
				}
				
				if ($request["postMethod"] == "create") {
					$request["command"] = "CreateWikiCommand";
				}
				
				if ($request["postMethod"] == "get") {
					$request["command"] = "GetWikisCommand";
				}		
			}
			
			/* -------------------------------------------------------------------------- */
			/* <<-- PUT METHOD - Erweiterung von $request um Attribute (Datenfelder) -->> */
			/* -------------------------------------------------------------------------- */		
			if ($_SERVER["REQUEST_METHOD"] == "PUT") {
				parse_str(file_get_contents("php://input"), $body_parameters);
				$request = $request + $body_parameters;
				
				/* --------------------------------------------- */
				/* <<-- Falls der Titel nicht gesetzt wurde -->> */
				/* --------------------------------------------- */
				if ($request["title"] == "") {
					header("HTTP/1.1 400");
					$validation_messages = array();
					$validation_messages["title"] = "Der Titel ist eine Pflichtangabe. Bitte geben Sie einen Titel an.";
					echo json_encode($validation_messages);
					return;
				}		
			}
			
			$request_headers = apache_request_headers();				// Request Header per apache_request_headers() auslesen und Methode execute übergeben
			
			$class_name = $request["command"];							// Auslesen des Klassennamens in $class_name
			
			$command = new $class_name;									// Klassenobjekt erstellen
		
			$result = $command->execute($request, $request_headers);	// Ausführen der Funktion execute()
						
			if($result !== NULL) {										// Falls die Rückgabe ungleich NULL ist (!== bedeutet, dass nur NULL den Fehler erzeugt)
						
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
//Programmaufruf:		http://localhost/rfh_dev_project/service/RequestHandler.php?command=[class_name] 

?>