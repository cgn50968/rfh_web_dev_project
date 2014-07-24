<?php
/* --------------------------------------------------------------------- */
/* <<-- Klasse: GetWikiCommand -->>                                      */	
/* --------------------------------------------------------------------- */

	class GetWikiCommand {
	
/* --------------------------------------------------------------------- */
/* <<-- Methoden -->>                                                    */	
/* --------------------------------------------------------------------- */
		public function execute($request) {
			
			/* -----------------------------------*/
			/* <<-- ERROR Handling: Keine id -->> */
			/* -----------------------------------*/
			if(isset($request["id"]) == FALSE) {			// Prüfung: 	Wenn der Parameter "id" nicht gesetzt wurde...
				header("HTTP/1.1 400");						// Rückgabe: 	HTTP Status Code 400
				return;										// Return:		Verarbeitung beenden
				}

			$id = $request["id"];							// Übergabe des Parameters "id"
			$wiki_service = new WikiService();				// Konstruktor:	neues Klassenobjekt "WikiService"
			$wiki = $wiki_service->readWiki($id);			// Funktionsaufruf: readWicki($id)
			
			/* ------------------------------------*/
			/* <<-- ERROR Handling: NOT_FOUND -->> */
			/* ------------------------------------*/
			if($wiki == WikiService::NOT_FOUND) {			// Prüfung: 	Wenn WikiService NOT_FOUND zurückgibt...
			header("HTTP/1.1 404");							// Rückgabe: 	HTTP Status Code 404
			return $wiki;									// Return:		Verarbeitung beenden
			}
			
			/* ----------------------------------------- */
			/* <<-- Zuweisung der URL für Datensatz -->> */
			/*------------------------------------------ */
			$wiki->url = "/wiki/service/wikis/$wiki->id"; 
			
			unset($wiki->id);								// Variable $id zurücksetzen
			
			header("Etag: $wiki->version");					// Die Version des Datensatzes wird im Etag Header gespeichert (z.B. Etag: 1)
			
			/* ---------------------------- */
			/* <<-- Etag wieder leeren -->> */
			/* ---------------------------- */
			unset($wiki->version);							// Die Version wird in der Ausgabe nicht mehr benötigt
			
			return $wiki;									// Rückgabe des Arrays (Datensatz)
		}
	}

?>