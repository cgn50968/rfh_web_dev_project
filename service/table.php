<?php

	/* TEST - AUSGABE */
	function writeTable($wikis) {
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
?>