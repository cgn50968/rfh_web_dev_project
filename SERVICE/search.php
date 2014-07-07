	<?php
						if (isset($_POST['suche_enter']))
						{
							$host = "localhost";
							$user = "root";
							$pass = "";
							$con = mysql_connect($host,$user,$pass) or die(mysql_error());
							mysql_select_db("wiki",$con) or die(mysql_error());
							$suchbegriff = trim(htmlentities(stripslashes(mysql_real_escape_string($_POST['suchfeld']))));
							
							$sql = "
								SELECT
									category, title, notes, author
								FROM
									wiki
								WHERE
									category LIKE '%$suchbegriff%'
									OR
									title LIKE '%$suchbegriff%'
									OR
									notes LIKE '%$suchbegriff%'
									OR
									author LIKE '%$suchbegriff%'
								ORDER BY
									category, title, author, notes
								";
							$query = mysql_query($sql);
							
							echo "<ul>";
							while($row = mysql_fetch_assoc($query))
							{
								$category = $row['category'];
								$title = $row['title'];
								$notes = $row['notes'];
								$author = $row['author'];
								
								echo "<li>$category $title $notes $author</li>";
							}
							echo "<ul>";
						}
										
					?>