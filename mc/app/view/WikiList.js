Ext.define('WebDevWiki.view.WikiList', {
	extend: 'Ext.dataview.List',			// Einbindung der Klasse dataview.List
	xtype: 'wikilist',						// Wikiliste schreiben
		config: {
			store: 'Wikis',					// Einbindung des Stores (aus /app/store/Wikis.js)
			itemTpl: '<div>{title}</div>',	// Template für den Titel
			emptyText: 'keine Wikis'		// Falls die Liste keine Einträge enthält
		}
});