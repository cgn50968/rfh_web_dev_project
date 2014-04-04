<?php

class GetTodosCommand {
	public function execute() {
		
		$todo_service = new TodoService();
		$todos = $todo_service->readTodos();
		
		if($todos == TodoService::ERROR) {						// Gibt Fehlercode 500 an Browser zurück...
			header("HTTP/1.1 500");
			return;												// Beendung der Verarbeitung
			}
		
		foreach($todos as $todo) {								// Zuweisen einer URL pro ID
			$todo->url = "/4 Service/todos/$todo->id"; 
			unset($todo->id);									// Löscht das Attribut aus dem Objekt
		}
		
		
		
		return $todos;
	}
}