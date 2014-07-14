Ext.define('Wikiliste.view.TodoList', {
	extend: 'Ext.dataview.List',			// Einbindung der Klasse dataview.List
	xtype: 'todolist',						// Todoliste schreiben
		config: {
			store: 'Wikis',					// Einbindung des Stores (aus /app/store/Todos.js)
			itemTpl: '<div>{title}</div>',	// Template für den Titel
			emptyText: 'keine Wikis'		// Falls die Liste keine Einträge enthält
		}
});