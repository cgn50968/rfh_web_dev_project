<?php


/* --------------------------------------------------------------------- */
/* <<-- class: SearchWikisCommand -->> 		                                 */	
/* --------------------------------------------------------------------- */

class SearchWikisCommand {
	public function execute() {
		
		/* ------------- */
		/*  WikiSearch  */
		/* ------------- */
		$wiki_search = new WikiService();							// Konstruktor - neues Objekt: WikiService
		
		
		/* ------------ */
		/*  countWikis  */
		/* ------------ */
		/*$count = $wiki_search->countWikis();						// Anzahl der Datensätze
		
		$pages = $count/5;
		settype($pages, "integer");

		$divisor = 5 * $pages;										// Summe der Datensäte ($pages ohne Nachkommastelle)
		
		if($count > $divisor) {										// Ist die Anzahl der Datensätze größer $divisor?
			$pages = $pages + 1;									// Wenn ja, Seitenzahl um 1 erhöhen
		}
		
		/* ----------- */
		/*  searchWikis  */
		/* ----------- */
		$searchwikis = $wiki_search->searchWikis();					// Funktionsaufruf: searchWikis()
		
		if($searchwikis == WikiService::ERROR) {						// Fehlercode 500, sofern in WikiService die DB Verbdindung fehlgeschlagen ist.
			header("HTTP/1.1 500");
			return;													// Beendung der Verarbeitung
			}
			
		/* ------------------------------------------------ */
		/*  Zuweisung der URL und Seitenzahl pro Datensatz  */
		/* ------------------------------------------------ */
		/*foreach($searchwikis as $wiki) {							// Zuweisen einer URL pro ID
						
			$wiki->url = "/wiki/service/wikis/$wiki->id";
			$wiki->pages = $pages;									
			
			unset($wiki->id);										// Löscht das Attribut aus dem Objekt
		}*/
		
		return $searchwikis;
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