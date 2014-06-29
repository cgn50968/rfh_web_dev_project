Ext.define('Todoliste.view.Main', {
	extend: 'Ext.navigation.View',					// Ableitung von Klasse Panel
	xtype: 'main',
	config: {
		items: {
			xtype: 'todolist'
		},
		defaultBackButtonText: 'Zurück'				// Konfiguration des Back Buttons in der Menüleiste
	}
   
});
