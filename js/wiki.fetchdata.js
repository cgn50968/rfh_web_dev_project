// ----------------------
// FORM2DIV
// ----------------------

function fetchData()
{
  var url = '/wiki/index.html';
  
  $.ajax({            
    type: "GET",
    url: url,
    data: "$_GET", // da müssen Parameter rein
    success: function(html){
      
      $("#showsearch").html(data);
    }
  });
}