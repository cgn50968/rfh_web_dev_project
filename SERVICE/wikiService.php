<?php

/* --------------------------------------------------------------------- */
/* <<-- wikiService - beinhaltet Basis-Methoden des Programms -->>       */	
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
	
		$succeeded = $link->set_charset("utf8");					// Zuweisung des Zeichencode "utf8"
		if($succeeded == FALSE) {									// Bei Zuweisungsfehler...
			$link->close();											// DB Verbindung schließen...
			return self::ERROR;										// Rückgabe: Error-Message: Zuweisung utf8 fehlgeschlagen
			}
			
		$sql_statement = 	"SELECT id, category, title_id, title, version, notes, author, creation_date, expiration_date FROM wiki WHERE id = $id";
															
		$result_set = $link->query($sql_statement);					// Ausführung der SQL Abfrage
		$wiki = $result_set->fetch_object("Wiki");					// Übergabe des SQL-Statements
		
		if($wiki === NULL) {										// Fehlermeldung: Falls kein Ergebnis übergeben wurde
			header("HTTP/1.1 404");									// HTTP Header: Fehlercode 404
			return self::NOT_FOUND;									// Rückgabe der Fehlermeldung...
			}
	
		$affected_rows = $link->affected_rows;						// Wieviele Datensätze sind betroffen
		if($affected_rows == 0) {									// Fehlermeldung: sofern keine Datensätze gefunden wurden
			return self::NOT_FOUND;
		}
		
		$link->close();
		return $wiki;			
		}
		
	/* ------------------------------------------------ */
	/* <<-- readWiki - Ausgabe aller Wiki Einträge -->> */
	/* ------------------------------------------------ */
	
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
			
		$sql_statement = 	"SELECT * ".	
							"FROM wiki";													
		
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
	
	if($wiki->title == "") {
		$result = new CreateWikiResult();
		$result->status_code = self::INVALID_INPUT;
		$result->validation_messages["title"] = "Bitte geben Sie einen Titel an.";	
		return $result;
	}
	
		@$link = new mysqli("localhost","root","","wiki");			// @ um Fehlermeldungen zu unterdrücken
		
		$succeeded = $link->set_charset("utf8");					// Zuweisung des Zeichencode "utf8"
		if($succeeded == FALSE) {									// Bei Zuweisungsfehler...
			$link->close();											// DB Verbindung schließen...
			return self::ERROR;										// Rückgabe: Error-Message: Zuweisung utf8 fehlgeschlagen
			}
			
		$sql_statement = 		"INSERT INTO wiki SET ".
								"version = 1, ".					// Neuer Datensatz startet mit Version = 1
								"category = '$wiki->category', ".				
								"title = '$wiki->title', ".
								"notes = '$wiki->notes', ".
								//"author = '$wiki->author' ".
								"creation_date = CURDATE(), ".
								"expiration_date = DATE_ADD(CURDATE(), INTERVAL 1 YEAR)";		//	Aktuelles Datum + 1 Jahr: "SELECT DATE_ADD(CURDATE(), INTERVAL 1 YEAR) AS Datum"
								
								
		$link->query($sql_statement);				// Einfügen des Datensatzes
		$id = $link->insert_id;						// ID als Rückgabe des INSERT Statements
		$link->close();								// DB Verbindung schließen
		/* $result = new CreateWikiResult();
		$result->status_code = self::OK;
		$result->id = $id; */
		return $result;								// Rückgabe ID
	
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
	
*/
		
}
?>

