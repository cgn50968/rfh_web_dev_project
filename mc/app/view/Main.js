Ext.define('WebDevWiki.view.Main', {
	extend: 'Ext.navigation.View',					
	xtype: 'main',
	config: {
		items: {
			xtype: 'wikilist'
		},
		defaultBackButtonText: 'Zurück'				// Konfiguration des Back Buttons in der Menüleiste
	}
   
});
