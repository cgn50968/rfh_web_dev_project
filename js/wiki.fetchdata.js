// ----------------------
// FORM2DIV
// ----------------------

function fetchData()
{
  var url = '/test/SERVICE/search.php';
  // The jQuery way to do an ajax request
  $.ajax({            
    type: "POST",
    url: url,
    data: "", // Your parameters here. looks like you have none
    success: function(html){
      // html contains the literal response from the server
      $("#showsearch").html(html);
    }
  });
}