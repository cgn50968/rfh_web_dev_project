<?php

/* --------------------------------------------------------------------- */
/* <<-- class: CreateWikiCommand -->>                                    */	
/* --------------------------------------------------------------------- */

class CreateWikiCommand {


		public function execute($request) {
			
			$wiki = new Wiki();													// Konstruktor - Klassenobjekt: Wiki
		
			if(isset($request["category"]) == TRUE) {							// Übergabe der Werte nur, wenn Werte in HTML Formular gesetzt wurden.
				$wiki->category = $request["category"];
			}
			
			if(isset($request["title"]) == TRUE) {
				$wiki->title = $request["title"];
			}
			/*
			if(isset($request["author"]) == TRUE) {								// Wie kann der Author aus der Anmeldung ausgelesen werden?
				$wiki->author = $request["author"];	
			}
			*/
			if(isset($request["notes"]) == TRUE) {
				$wiki->notes = $request["notes"];
			}
			
		
			// http://localhost/rfh_web_dev_project/service/RequestHandler.php?command=CreateWikiCommand&category=PHP&title=Der%20Titel&notes=Das%20ist%20der%20Text
		
			

		
			$wiki_service = new WikiService();									// Konstruktor - Klassenobjekt: WikiService
		
			$result = $wiki_service->createWiki($wiki);							// Aufruf der Funktion createWiki, Parameter = Klassenobjekt $wiki
		
			if($result->status_code == WikiService::INVALID_INPUT) {			// Eingabefehler
				// Header setzen
				header("HTTP/1.1 400");											// HTTP Heaser: Fehlercode 400
				return $result->validation_messages;
				}
					
			header("HTTP/1.1 201");												// Nach POST Aufruf ist der HTTP Status Code 201 zu setzten.
			header("Location: /service/wikis/$result->id");		
			
			// ACHTUNG !! Ausgabe nur fürs Debugging..
			return $result->id;
			
		}
	}


?>