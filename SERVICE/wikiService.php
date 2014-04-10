<?php

/* WikiService - beinhaltet alle Basis Methoden des Programms */

class WikiService {
	/* -----#_Deklarationsbereich_#----- */
	
	/* --- Konstanten für Error-Messages --- */
	const ERROR = "ERROR";			
	const NOT_FOUND = "NOT_FOUND";
	const INVALID_INPUT = "INVALID_INPUT";
	const OK = "OK";
	const VERSION_OUTDATED = "VERSION_OUTDATED";

	
	/* --------------------------------------------------------------------- */
	
	/* ----- #_Funktionsbereich_#----- */
	
	/* <<-- readWiki - Ausgabe eines Wiki Eintrags -->> */
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
	
		$affected_rows = $link->affected_rows;				// Wieviele Datensätze sind betroffen
		if($affected_rows == 0) {
			return self::NOT_FOUND;
		}
		
		$link->close();
		return $wiki;			
		}
		
		
	/* <<-- readWiki - Ausgabe aller Wiki Einträge -->> */
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
		
		$wikis = array();										// Deklaration: wikis = Array
		$wiki = $result_set->fetch_object("Wiki");
		while($wiki != NULL) {
			$wikis[] = $wiki;
			$wiki = $result_set->fetch_object("Wiki");
			}
		$link->close();
		return $wikis;			
		}
		
	/* --------------------------------------------------------------------- */
	
	/* ----- #_Infobereich_#----- */
	
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

