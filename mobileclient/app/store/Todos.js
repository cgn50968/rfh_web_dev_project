Ext.define('Todoliste.store.Todos', {
	extend: 'Ext.data.ArrayStore',
	config: {
		proxy: {							// Abruf der Daten aus SERVICE
			type: 'rest',
			url: '/ordonr/4 service/todos',
			reader: {
				type: 'json'
			},
			
			// FEHLERBEHANDLUNG - Horcher... ;-)
			listeners: {
				exception: function(proxy, request) {
					Ext.Msg.alert('Fehler',request.statusText);
				}
			}
			
		},
		model: 'Todoliste.model.Todo',		// Referenz auf Klasse Todo
		autoLoad: true						// Der Store lädt bei Instanziierung automatisch Daten
	}
});