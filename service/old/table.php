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
}
?>