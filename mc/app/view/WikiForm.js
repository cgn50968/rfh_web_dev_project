Ext.define('WebDevWiki.view.WikiForm', {
	extend: 'Ext.form.Panel',
	xtype: 'wikiform',						// alias für Klasse, um diese vom Controller aus aufrufen zu können
	requires: [
		'Ext.field.Text',
		'Ext.field.DatePicker'
	],
	config: {
		items: [							// Formular Felder
			{
			xtype: 'textfield',				// Texteingabefeld für den Titel
			name: 'category',
			label: 'Kategorie',
			readOnly: true
			},
			{
			xtype: 'textfield',				// Texteingabefeld für den Titel
			name: 'title',
			label: 'Titel',
			readOnly: true
			},
			{
			xtype: 'textfield',				// Texteingabefeld für den Autor
			name: 'author',
			label: 'Autor',
			readOnly: true
			},
			{
			xtype: 'datepickerfield',		// Texteingabefeld für das Datum
			name: 'expiration_date',
			label: 'Fälligkeits-Datum',
			readOnly: true,
			dateFormat: 'd.m.Y'
			},
			{
			xtype: 'textareafield',			// Texteingabefeld für Notes
			name: 'notes',
			label: 'Notiz',
			readOnly: true
			}
		]
	}
});