// ----------------------
// Darstellung der Details
// ----------------------

$.widget("todo.todoDetails", {
	load: function(todoUrl) {
	
		$.ajax({
		  url: todoUrl,																	// URL als Übergabeparameter für Aufruf "/ordonr/4 service/todos/$id"
		  dataType: "json",
		  
		  success: function(todo) {
		  
			this.element.find(".author").text(todo.author);								// Übergabe der Attribute aus "todo" an <span> Element 
			this.element.find(".due_date").text(todo.due_date);	
			this.element.find(".title").text(todo.title);		
			this.element.find(".notes").text(todo.notes);	

			alert("HTTP-Antowrt erhalten");
		  },
		  context: this																	// Referenzieren dieses Widgets
		});
	}
});