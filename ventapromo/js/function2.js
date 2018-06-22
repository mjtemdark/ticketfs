$(document).ready(function(){
	tabla();
	

});
function tabla()
{

	$.ajax({
		type:"post",
		url:"list.php",
		success: function(data)
		{
			var rows="";
			var reg=eval(data);
			for(var i=0; i<reg.length; i++)
			{
				rows+='<tr><td>'+reg[i].ind+'</td><td>'+reg[i].tipo+'</td><td>'+reg[i].check;
				rows+='</td><td>'+reg[i].pay+'</td><td>'+reg[i].name+'</td><td>'+reg[i].nro+'</td></tr>';
			}
			$('#printable2>tbody').html(rows);
		},
		complete: function(data)
		{
			datatable();
		}

	});
}
function datatable()
{
$('#printable2').footable();
	
}