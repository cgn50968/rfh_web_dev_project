// ----------------------
// FORM2DIV
// ----------------------




jQuery(document).ready(function($) 									//jQuery wartet, daß die Seite fertig ist, um Javascript ausführen zu können
	{
    		$('.btnSearch').click(function()						//jQuery-Funktion "click": wenn Knopfdruck, dann führe Funktion makeAjaxRequest() aus
			{
    			makeAjaxRequest();
    		});
			

            $('form').submit(function(e)							//jQuery-Funktion "submit": Inhalt des Formulars wird eingereicht; damit sind Formulr und Button mit der gleichen Funktion belegt: makeAjaxRequest()
			{
                e.preventDefault();
                makeAjaxRequest();
                return false;
            });

            function makeAjaxRequest()								//Definition der Funktion
			{
                $.ajax(
				{
                    url: 'SERVICE/search.php',						//Verknüpfung mit search.php
                    type: 'get',
                    data: {name: $('input#name').val()},
                    success: function(response)						//Bei Erfolg Funktion "response" ausführen
					{
                        $("#wiki_list").hide();
						$('table#resultTable tbody').html(response);//Dabei wird an das HTML-tag resultTable der Wert zurückgegeben
                    }
                });
            }
	}
);