Ext.define('WebDevWiki.store.Wikis', {
	extend: 'Ext.data.ArrayStore',
	config: {
		proxy: {																// Abruf der Daten aus dem Web SERVICE
			type: 'rest',

			url: '/wiki/service/RequestHandler.php?command=GetWikisMobCommand',
			reader: {
				type: 'json'
			},
			
			// FEHLERBEHANDLUNG
			listeners: {
				exception: function(proxy, request) {
					Ext.Msg.alert('Fehler',request.statusText);
				}
			}
			
		},
		model: 'WebDevWiki.model.Wiki',											// Referenz auf Klasse Wiki
		autoLoad: true															// Der Store lädt bei Instanziierung automatisch Daten
	}
});