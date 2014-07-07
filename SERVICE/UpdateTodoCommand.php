<?php
	class UpdateTodoCommand {
	
		public function execute($request, $request_headers) {
			// Übergabe der REQUEST Daten an das Objekt Todo
			$todo = new Todo();
			if(isset($request["title"]) == TRUE) {
				$todo->title = $request["title"];
				}
			$todo->due_date = $request["due_date"];
			$todo->author = $request["author"];
			$todo->notes = $request["notes"];
			$todo->id = $request["id"];
			$todo->version = $request_headers["If-Match"];	// Setzen, falls die Versionsnummern übereinstimmen.
			
			$todo_service = new TodoService();				// Konstruktor - neues Objekt TodoService 
			$result = $todo_service->updateTodo($todo);		// Aufruf der Funktion updateTodo()
			if($result == TodoService::VERSION_OUTDATED) {
				header("HTTP/1.1 412");
			}
			if($result == TodoService::NOT_FOUND) {
				header("HTTP/1.1 404");
			}
		}
	}
	
?>