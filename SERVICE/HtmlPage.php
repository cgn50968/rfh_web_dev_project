<?php

class HtmlPage {

	/* HTML Header */
	public function writeHtmlHeader() {
		?>
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
				<title><?php echo "Title" ?></title>									<!-- !!! - Titel setzen -->
				<link rel="stylesheet" type="text/css" href="./css/common.css"/>
			</head>
			<body>
				<div id="header">
					<h1><?php echo "Title" ?></h1>
						<a id="home" href="TodoList.html"><img src="images/home.png" alt="Home"/></a>
				</div>
		<?php
	}	


	/* TEST - AUSGABE */
	public function writeTable($wikis) {
		foreach($wikis as $wiki) {								// Zuweisen einer URL pro ID
					
		//echo(json_encode($wiki->title));  
		?>
				<table>
					<tr class="uneven" >
						<td><?php echo(json_encode($wiki->title)); ?></td>
						<td><?php echo(json_encode($wiki->author)); ?></td>
						<td><?php echo(json_encode($wiki->notes)); ?></td>
						<td><?php echo(json_encode($wiki->creation_date)); ?></td>
						<td><?php echo(json_encode($wiki->expiration_date)); ?></td>
					</tr>
				</table>
		<?php
		}
	}

	/* HTML Bottom */
	public function writeHtmlBottom() {
		?>
		</body>
		</html>
		<?php
	}
	
	/* SHOW Details */
	public function showDetails($wikis) {
		foreach($wikis as $wiki) {
		?>
		 <div>
		  <!-- <form action="test.php" method="post"> -->
		  <form action="RequestHandler.php" method="get">
			<table>
			  <tr>
				<td>
				  <label for="due_date">Fällig</label><span class="label">, </span>
				  <label for="author">Autor:</label></td>
				<td id="due_date_td">                                  
				  <input type="text" name="due_date" id="due_date" value=<?php echo(json_encode($wiki->creation_date)); ?> readonly="readonly" disabled="true"/>
				</td>
				<td id="created_date_td">                                  
				  <input type="text" name="created_date" id="created_date" value=<?php echo(json_encode($wiki->expiration_date)); ?> readonly="readonly" disabled="true"/>
				</td>
				<td id="author_td">                                 
				  <input type="text" name="author" id="author" value=<?php echo(json_encode($wiki->author)); ?> readonly="readonly" disabled="true" />
				</td>
			  </tr>
			  <tr>
				<td><label for="notes">Beschreibung:</label></td>
				<td colspan="3">
				  <textarea name="notes" id="notes" rows="10" cols="10" readonly="readonly" disabled="true"><?php echo(json_encode($wiki->notes)); ?></textarea>
				</td>
			  </tr>
			  <tr>
				<td id="buttons" colspan="4">
				  <input type="submit" name="command" value="GetWikisCommand"/>  <!-- Lösung -->
				  <td id="buttons" colspan="4">
				  <input type="submit" name="delete" value="Löschen"/>
				</td>
				</td>
			  </tr>
			</table>
		  </form>
		</div>
		<?php
		}
	}
	
	/* EDIT Details */
	public function editDetails($wikis) {
		foreach($wikis as $wiki) {
		?>
		 <div>
		  <form action="..." method="post">
			<table>
			  <tr>
				<td>
				  <label for="due_date">Fällig</label><span class="label">, </span>
				  <label for="author">Autor:</label></td>
				<td id="due_date_td">                                  
				  <input type="text" name="due_date" id="due_date" value=<?php echo(json_encode($wiki->creation_date)); ?> />
				</td>
				<td id="created_date_td">                                  
				  <input type="text" name="created_date" id="created_date" value=<?php echo(json_encode($wiki->expiration_date)); ?> />
				</td>
				<td id="author_td">                                 
				  <input type="text" name="author" id="author" value=<?php echo(json_encode($wiki->author)); ?> />
				</td>
			  </tr>
			  <tr>
				<td><label for="notes">Beschreibung:</label></td>
				<td colspan="3">
				  <textarea name="notes" id="notes" rows="10" cols="10" ><?php echo(json_encode($wiki->notes)); ?></textarea>
				</td>
			  </tr>
			  <tr>
				<td id="buttons" colspan="4">
				  <input type="submit" name="delete" value="Löschen"/>
				</td>
			  </tr>
			</table>
		  </form>
		</div>
		<?php
		}
	}
	
}
?>