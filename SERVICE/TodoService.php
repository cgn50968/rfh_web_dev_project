<?php

class TodoService {

	//Konstante für Error deklarieren
	const ERROR = "ERROR";			
	
	public function readTodos()
	{
			// @ um Fehlermeldungen zu unterdrücken
			@$link = new mysqli("localhost","root","","todolist");		
			
			// Fehlermeldung
			if($link->connect_error != NULL) {
				return self::ERROR;
			}
			
			// Falls ein Fehler bei der Zeichencodierung auftritt, DB Verbindung schließen...
			$succeeded = $link->set_charset("utf8");
			if($succeeded == FALSE) {
				$link->close();
				return self::ERROR;
				}
			
			$sql_statement = 	"SELECT id, created_date, due_date, due_date <= CURDATE() as due, author, title, notes ".	
								"FROM todo ".													
								"ORDER BY due_date ASC";
			$result_set = $link->query($sql_statement);
			$todos = array();	
			$todo = $result_set->fetch_object("Todo");
			while($todo != NULL) {
				$todos[] = $todo;
				$todo = $result_set->fetch_object("Todo");
			}
			$link->close();
			return $todos;			
			
			
			/*
			$todo->id = 1;							
			$todo->created_date = "2014-03-29"; 
			$todo->due_date = "2014-06-29";
			$todo->due = FALSE;
			$todo->author = "Roger Ordon";
			$todo->title = "Es geht los"; 
			$todo->notes = "Dies ist ein Test";
			*/
			
			
			
	}
}
?>

