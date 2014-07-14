Ext.define('Wikiliste.model.Todo', {	
	extend: 'Ext.data.Model',
	config: {						
		fields: [
			{
				name: 'title'
			},
			{
				name: 'author'
			},
			{
				name: 'expiration_date',
				type: 'date'					// Datentyp
			},
			{
				name: 'notes'
			}
		]
	}
});