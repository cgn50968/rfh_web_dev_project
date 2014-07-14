Ext.define('WebDevWiki.controller.AppController', {
	extend: 'Ext.app.Controller',
	config: {
		control: {
			wikilist: {
				itemtap: 'showWikiDetails'
			}
		},
		refs: {
			main: 'main'
		}
	},
	
	showWikiDetails: function(list, index, target, record) {
		var main = this.getMain();
		var wikiForm = Ext.widget('wikiform');
		wikiForm.setRecord(record);									// Setzt das Wiki für das Formular (Datenübergabe)
		main.push(wikiForm);
	}
});

