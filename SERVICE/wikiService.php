<?php

/* WikiService - beinhaltet alle Basis Methoden des Programms */

class WikiService {
	/* -----#_Deklarationsbereich_#----- */
	
	/* --- Konstanten für Error-Messages --- */
	const ERROR = "ERROR";			
	
	/* --- MySQL Datenbank --- */
	public $sqlHost = "localhost";
	public $sqlUser = "root";
	public $sqlPwd = "";
	public $sqlDB = "wiki";
	
	/* --------------------------------------------------------------------- */
	
	/* ----- #_Funktionsbereich_#----- */
	
	/* --- readWiki - Ausgabe aller Wiki Einträge --- */
	
	public function readWiki()
	{
		@$link = new mysqli("localhost","root","","wiki");		// @ um Fehlermeldungen zu unterdrücken
	
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
		
		
	
	public function readWikis()
	{
		@$link = new mysqli($sqlHost,$sqlUser,$sqlPwd,$sqlDB);		// @ um Fehlermeldungen zu unterdrücken
	
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
}
?>

