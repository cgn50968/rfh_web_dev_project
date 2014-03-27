<?php 
	/* PHP Funktionen zur Ausführung von SQL Statements */
	
	/* Variablen */
	$host = "localhost";
	$db_usr = "root";
	$db_pwd = "";
	$database = "todo";
	$sql_statement = $sql_statement = "SELECT * FROM todo WHERE id=2";
	
	
	/* Funktionsaufruf */
	
	$array = sql_connect("localhost","root","","todo",$sql_statement);					// Funktionsaufruf - sql_connect
	var_dump($array);																	// Debug Ausgabe
		
	
	/* Funktion sql_connect */
	
	function sql_connect($host, $db_usr, $db_pwd, $table, $sql_statement) {
		$link = mysqli_connect($host,$db_usr,$db_pwd,$table); 							// Paramenter = [Host, User, Password, Database]
		mysqli_set_charset($link, "utf8");												// Festlegung des charsets für Datensatzinhalte
		$result_set = mysqli_query($link, $sql_statement);								// Datenbankaufruf
		$dataset = mysqli_fetch_assoc($result_set);										// Übergabe des 1. Datensatzes an Array
		
		while($dataset != NULL) {														// Solange $dataset ungleich NULL ist bzw. weitere Datensätze in der Query vorhanden sind...
			$datasets[] = $dataset;														// Übergabe des Datensatzes an das zweidimensionale Array $datasets
			$dataset = mysqli_fetch_assoc($result_set);
		}	
		
		mysqli_close($link);															// Datenbankverbindung schließen
		return $datasets;																// Rückgabe aller Datensätze
	}
?>	