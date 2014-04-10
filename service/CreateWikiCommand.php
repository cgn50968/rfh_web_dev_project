<?php

class CreateWikiCommand {
		public function execute($request) {
		
		
			$wiki = new Wiki();													// Konstruktor - Klassenobjekt: Wiki
		
			if(isset($request["category"]) == TRUE) {							// Übergabe der Werte, wenn Werte gesetzt wurden.
				$wiki->title = $request["category"];
			}
			
			if(isset($request["title"]) == TRUE) {
				$wiki->title = $request["title"];
			}
			
			if(isset($request["notes"]) == TRUE) {
			$todo->due_date = $request["notes"];
			}
			
		
		
		
		//Manueller Aufruf über Browser: http://localhost/ordonr/4%20SERVICE/RequestHandler.php?command=CreateTodoCommand&author=Roger&title=Der%20Titel&notes=Das%20ist%20alles%20richtig

		
			$wiki_service = new WikiService();									// Konstruktor - Klassenobjekt: WikiService
		
			$result = $wiki_service->createWiki($wiki);
		
			if($result->status_code == WikiService::INVALID_INPUT) {			// Eingabefehler
				// Header setzen
				header("HTTP/1.1 400");											// HTTP Heaser: Fehlercode 400
				return $result->validation_messages;
				}
			
		
		// Header setzen
		header("HTTP/1.1 201");
		header("Location: /service/wikis/$result->id");		
		
		// ACHTUNG !! Ausgabe nur fürs Debugging..
		return $result->id;
		
		}
	}


?>