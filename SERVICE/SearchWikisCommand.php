<?php


/* ------------------------------------ */
/* <<-- class: SearchWikisCommand -->>  */
/* ------------------------------------ */

class SearchWikisCommand {
	
	public function execute($request) {
		
		/* ------------- */
		/*  WikiSearch  */
		/* ------------- */
		$wiki_service = new WikiService();							// Konstruktor - neues Objekt: WikiService
		
		$wikis = $wiki_service->searchWikis();					// Funktionsaufruf: searchWikis()
		
		if($wikis == WikiService::ERROR) {						// Fehlercode 500, sofern in WikiService die DB Verbdindung fehlgeschlagen ist.
			header("HTTP/1.1 500");
			return;													// Beendung der Verarbeitung
		}
			

								
		/* ------------------------------------------------ */
		/*  Zuweisung der URL und Seitenzahl pro Datensatz  */
		/* ------------------------------------------------ */
		foreach($wikis as $wiki) {									// Zuweisen einer URL pro ID
			
			$wiki->url = "/wiki/service/wikis/$wiki->id";
			unset($wiki->id);										// Löscht das Attribut aus dem Objekt
		}
		return $wikis;
	}
	
}


/*
	
	if(empty($rows)) 
	{
		echo "<tr>";
			echo "<td colspan='4'>Keine Einträge gefunden.</td>";
		echo "</tr>";
	}
	
	else
	{
		echo json_encode($rows);
		foreach ($rows as $row) 
		{
			echo "<tr>";
				echo "<td>".$row['author']."</td>";
				echo "<td>".$row['category']."</td>";
				echo "<td>".$row['title']."</td>";
				echo "<td>".$row['creation_date']."</td>";
			echo "</tr>";
		}
	}
	
	
*/
?>