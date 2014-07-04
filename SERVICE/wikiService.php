<?php

/* --------------------------------------------------------------------- */
/* <<-- class: wikiService - Basis-Methoden des Programms -->>           */	
/* --------------------------------------------------------------------- */

class WikiService {

/* --------------------------------------------------------------------- */
/* <<-- Attribute -->>                                                   */	
/* --------------------------------------------------------------------- */
	
	/* --------------------------------------- */
	/* <<-- Konstanten für Error-Messages -->> */
	/* --------------------------------------- */
	
	const ERROR = "ERROR";			
	const NOT_FOUND = "NOT_FOUND";
	const INVALID_INPUT = "INVALID_INPUT";
	const OK = "OK";
	const VERSION_OUTDATED = "VERSION_OUTDATED";

/* --------------------------------------------------------------------- */
/* <<-- Methoden -->>                                                    */	
/* --------------------------------------------------------------------- */

	/* ------------------------------------------------ */
	/* <<-- readWiki - Ausgabe eines Wiki Eintrags -->> */
	/* ------------------------------------------------ */
	
	public function readWiki($id)
	{
		@$link = new mysqli("localhost","root","","wiki");			// @ um Fehlermeldungen zu unterdrücken
	
		if($link->connect_error != NULL) {							// Fehlermeldung bei Verbindungsfehler
			return self::ERROR;
			}
		
		/* ------------------------------------------------ */
		/* <<-- ERROR Handling: Zuweisungsfehler utf8 -->>  */
		/* ------------------------------------------------ */	
		$succeeded = $link->set_charset("utf8");					// Zuweisung:	Zeichencode = "utf8"
		if($succeeded == FALSE) {									// Prüfung:		Zuweisung nicht erfolgreich
			$link->close();											// Aktion:		DB Verbindung schließen...
			return self::ERROR;										// Rückgabe: 	ERROR
			}
			
		$sql_statement = 	"SELECT id, version, category, title, notes, author, creation_date, expiration_date FROM wiki WHERE id = $id";
		
		$result_set = $link->query($sql_statement);					// Ausführung der SQL Abfrage
		$wiki = $result_set->fetch_object("Wiki");					// Übergabe des SQL-Statements
		
		/* -------------------------------------*/
		/* <<-- ERROR Handling: Array leer -->> */
		/* -------------------------------------*/
		if($wiki === NULL) {										// Prüfung:		Wenn kein Datensatz zurückgegeben wurde...
			header("HTTP/1.1 404");									// Fehler:		HTTP Status Code 404
			return self::NOT_FOUND;									// Rückgabe: 	NOT_FOUND
			}
	
		/* ------------------------------------------------ */
		/* <<-- ERROR Handling: Betroffene Zeilen = 0 -->>  */
		/* ------------------------------------------------ */		
		$affected_rows = $link->affected_rows;						// Abfrage:		Wieviele Datensätze sind betroffen
		if($affected_rows == 0) {									// Prüfung: 	Wurde keine Spalte/Datensatze zurückgegeben?
			return self::NOT_FOUND;									// Rückgabe:	NOT_FOUND
		} 
		
		$link->close();
		return $wiki;			
		}
		
	/* ------------------------------------------------- */
	/* <<-- readWikis - Ausgabe aller Wiki Einträge -->> */
	/* ------------------------------------------------- */
	
	public function readWikis()
	{
		@$link = new mysqli("localhost","root","","wiki");			// @ um Fehlermeldungen zu unterdrücken
	
		if($link->connect_error != NULL) {							// Fehlermeldung bei Verbindungsfehler
			return self::ERROR;
			}
	
		$succeeded = $link->set_charset("utf8");					// Zuweisung des Zeichencode "utf8"
		if($succeeded == FALSE) {									// Bei Zuweisungsfehler...
			$link->close();											// DB Verbindung schließen...
			return self::ERROR;										// Rückgabe: Error-Message: Zuweisung utf8 fehlgeschlagen
			}
			
		$sql_statement = "SELECT id, version, category, title, notes, author, creation_date, expiration_date FROM wiki";
									
		$result_set = $link->query($sql_statement);
		
		$wikis = array();											// Deklaration: wikis = Array
		$wiki = $result_set->fetch_object("Wiki");
		while($wiki != NULL) {
			$wikis[] = $wiki;
			$wiki = $result_set->fetch_object("Wiki");
			}
		
		$affected_rows = $link->affected_rows;						// Wieviele Datensätze sind betroffen
		if($affected_rows == 0) {									// Fehlermeldung: sofern keine Datensätze gefunden wurden
			return self::NOT_FOUND;
		}
		
		$link->close();
		return $wikis;			
		}
		
	/* --------------------------------------------------- */	
	/* <<-- createWiki - Neuen Wiki Eintrag erstellen -->> */
	/* --------------------------------------------------- */	
	
	public function createWiki($wiki) {
	
		/* ------------------------------------------------ */	
		/* <<-- ERROR Handling - Eingabe unvollständig -->> */
		/* ------------------------------------------------ */
		
		if($wiki->category == "") {
			$result = new CreateWikiResult();
			$result->status_code = self::INVALID_INPUT;
			$result->validation_messages["category"] = "Bitte geben Sie eine Kategorie an.";	
			return $result;
		}
	
		if($wiki->title == "") {
			$result = new CreateWikiResult();
			$result->status_code = self::INVALID_INPUT;
			$result->validation_messages["title"] = "Bitte geben Sie einen Titel an.";	
			return $result;
		}
		
		if($wiki->notes == "") {
			$result = new CreateWikiResult();
			$result->status_code = self::INVALID_INPUT;
			$result->validation_messages["notes"] = "Es wurde kein Beschreibungstext eingetragen.";	
			return $result;
		}
		
		@$link = new mysqli("localhost","root","","wiki");			// @ um Fehlermeldungen zu unterdrücken
		
		$succeeded = $link->set_charset("utf8");					// Zuweisung des Zeichencode "utf8"
		if($succeeded == FALSE) {									// Bei Zuweisungsfehler...
			$link->close();											// DB Verbindung schließen...
			return self::ERROR;										// Rückgabe: Error-Message: Zuweisung utf8 fehlgeschlagen
			}
			
		$sql_statement = 	"INSERT INTO wiki SET ".
							"version = 1, ".					// Neuer Datensatz startet mit Version = 1
							"category = '$wiki->category', ".				
							"title = '$wiki->title', ".
							"notes = '$wiki->notes', ".
							//"author = '$wiki->author' ".		// Author wird aus Formular ausgelesen (OFFEN)
							"creation_date = CURDATE(), ".
							"expiration_date = DATE_ADD(CURDATE(), INTERVAL 1 YEAR)";		//	Aktuelles Datum + 1 Jahr: "SELECT DATE_ADD(CURDATE(), INTERVAL 1 YEAR) AS Datum"
															
		$link->query($sql_statement);							// Einfügen des Datensatzes
		$id = $link->insert_id;									// ID als Rückgabe des INSERT Statements
		$link->close();											// DB Verbindung schließen
		
		$result = new CreateWikiResult();
		$result->status_code = self::OK;
		$result->id = $id;										// Übergabe der neuen ID an $result
		return $result;											// Rückgabe ID
		}
		
	/* -------------------------------------------*/	
	/* <<-- updateWiki - Wiki Eintrag ändern -->> */
	/* -------------------------------------------*/
		public function updateWiki($wiki) {
			
			@$link = new mysqli("localhost","root","","wiki");			// @ um Fehlermeldungen zu unterdrücken
			
			$succeeded = $link->set_charset("utf8");					// Zuweisung des Zeichencode "utf8"
			if($succeeded == FALSE) {									// Bei Zuweisungsfehler...
				$link->close();											// DB Verbindung schließen...
				return self::ERROR;										// Rückgabe: Error-Message: Zuweisung utf8 fehlgeschlagen
				}
				
			$sql_statement = 	"UPDATE wiki SET ".
								"version = version + 1, ".										// Neuer Datensatz startet mit Version = 1
								"category = '$wiki->category', ".				
								"title = '$wiki->title', ".
								"notes = '$wiki->notes', ".
								//"author = '$wiki->author' ".									// Author wird aus Formular ausgelesen (OFFEN)
								"expiration_date = DATE_ADD(CURDATE(), INTERVAL 1 YEAR)".		// Aktuelles Datum + 1 Jahr: "SELECT DATE_ADD(CURDATE(), INTERVAL 1 YEAR) AS Datum"
								"WHERE id = '$wiki->id'"; 
								//AND version = $wiki->version";			// ID und Versionsnummer müssen übereinstimmen
			
			echo($sql_statement);
			
			$link->query($sql_statement);														// Einfügen des Datensatzes
			
			/* ----------------------------------------------------- */	
			/* <<-- Prüfung: Wieviele Datensätze betroffen sind -->> */
			/* ----------------------------------------------------- */
			$affected_rows = $link->affected_rows;												// Wieviele Datensätze sind betroffen?
			
			if($affected_rows == 0) {
				$sql_statement = "SELECT COUNT(*) FROM todo WHERE id = $wiki->id";				// Fehler nur zurückgeben, sofern zur ID ein Wiki existiert, ansonsten NOT_FOUND
				$result_set = $link->query($sql_statement);										// Rückgabe
				$row = $result_set->fetch_row();												// Übergabe der Anzahl der betroffenen Datensätze
				$count = $row[0];					
				$link->close();
			if($count == 1) {
				return self::VERSION_OUTDATED;													// Falls kein Datensatz betroffen ist... 
				}
			return self::NOT_FOUND;
			}
			else {
				$link->close();																	// Falls affected_rows größer 0 
				$id = $link->insert_id;															// ID als Rückgabe des INSERT Statements
				$link->close();																	// DB Verbindung schließen
			}
		}
		
	/* --------------------------------------------*/	
	/* <<-- deleteWiki - Wiki Eintrag löschen -->> */
	/* --------------------------------------------*/
		public function deleteWiki($id) {
	
			@$link = new mysqli("localhost","root","","wiki");			// @ um Fehlermeldungen zu unterdrücken
					
			$succeeded = $link->set_charset("utf8");					// Zuweisung des Zeichencode "utf8"
			if($succeeded == FALSE) {									// Bei Zuweisungsfehler...
				$link->close();											// DB Verbindung schließen...
				return self::ERROR;										// Rückgabe: Error-Message: Zuweisung utf8 fehlgeschlagen
				}
			$sql_statement = 	"DELETE FROM wiki ".
								"WHERE id = $id";
		
			$link->query($sql_statement);
			$affected_rows = $link->affected_rows;						// Wieviele Datensätze sind betroffen
			$link->close();

			if($affected_rows == 0) {
				return self::NOT_FOUND;
			}
		
	}
	
/* --------------------------------------------------------------------- */
/* <<-- Infobereich -->>                                                 */	
/* --------------------------------------------------------------------- */

/*
	HTML Aufruf:
	
		Standardaufruf:
			http://localhost/rfh_web_dev_project/service/RequestHandler.php?command=$class_name		
			
			class_name = GetWikiCommand, GetWikisCommand, 
	
		readWiki($id)
			http://localhost/rfh_web_dev_project/service/wikis/$id	
			$id = Datensatz ID
		
		readWikis()
			http://localhost/rfh_web_dev_project/service/wikis	
			
		createWiki()
			http://localhost/rfh_web_dev_project/service/RequestHandler.php?command=CreateWikiCommand&category=PHP&title=Der%20Titel&notes=Das%20ist%20der%20Text
	
		updateWiki()
			http://localhost/rfh_web_dev_project/service/RequestHandler.php?command=UpdateWikiCommand&id=1&category=HTML&title=Der%20Titel&notes=Das%20ist%20der%20Text
		
		deleteWiki()
			http://localhost/rfh_web_dev_project/service/RequestHandler.php?command=DeleteWikiCommand&id=20
*/
		
}
?>

