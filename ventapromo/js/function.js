$(document).ready(function(){
	var htm='';
	var index=[1,101,201,301,401,501];
	for(var i=0; i<100; i++)
	{
		htm=$('<tr></tr>');
		for(var j=0;j<=5;j++)
		{
			column(htm,index[j]);
			index[j]+=1;
		}
		
		$('#printable>tbody').append(htm);

	}

	lista(0);

	
$(document).on('click','#checkticket', function()
{
	id=$(this).data("number");
	checkstatus=$(this).data("checked");
	if(checkstatus==0)
	{
		if(confirm("Marcar Este Ticket"))
		
		checkticket(id, checkstatus);

	}
	else
	{
		$('input[name=rsticket]').val(id);
	}

});
$(document).on('click','#pay', function()
{
	id=$(this).data("number");
	paystatus=$(this).data("pay");
	if(paystatus==0)
	{
		//if(confirm("Pagar este ticket"))
	
		checkpay(id,paystatus);
	
	}
	else
	{
		$('input[name=rsticket]').val(id);
	}
	
})
});
function reseticket()
{
	if(confirm("Resetear Este ticket?"))
	{
	var id=parseInt($('input[name=rsticket]').val());
	checkticket(id,1);
	}
	$('input[name=rsticket]').val('');
}
function resetpay()
{
	if(confirm("Resetear el pago?"))
	{
	var id=parseInt($('input[name=rsticket]').val());
	checkpay(id,1);
	}
	$('input[name=rsticket]').val('');
}
function datatable()
{
/*	$('#printable').footable();*/
	$('#printable').dataTable({
		"destroy": true,
		"ordering": false,
		"pagination": true,
		"pageLength": 100
	});
}
function cell(query,ind)
{
	$.ajax({
		data: {"query":query,"id":ind},
		type: "post",
		url: "table.php",
		success: function(data)
		{
			var reg=eval(data);
			var cell='';
			cell+='<div id="epay" class="epay'+reg[0].nro+'"></div><div id="checkticket" data-checked='+reg[0].check+' data-number='+reg[0].nro+'>'+reg[0].index+'</div><span class="tp"></span>';
				$('#i'+reg[0].nro).html(cell);
				//$('#i'+reg[i].nro).text('<div></div>');
				if(reg[0].pay==1)
				{
					$('.epay'+reg[0].nro).html('<span id="pay" data-number='+reg[0].nro+' data-pay="1" class="ui-icon ui-icon-check">');
				}
				else
				{
					$('.epay'+reg[0].nro).html('<span data-pay="0" data-number='+reg[0].nro+' id="pay" class="ui-icon   ui-icon-closethick ">');
				}
				if(reg[0].check==1)
				{
					$('#i'+reg[0].nro).removeClass('uncheck');
					
					$('#i'+reg[0].nro).addClass('check');
				}
				else
				{
					$('#i'+reg[0].nro).removeClass('check');
					$('#i'+reg[0].nro).addClass('uncheck');

				}
				if(reg[0].tipo==2)
				{

					$('#i'+reg[0].nro+'>.tp').html("Pl").addClass('pll');
				}
				else
				{
					$('#i'+reg[0].nro+'>.tp').html("Pr").addClass('prr');
				}

		}	
		
	});
}
function column (htm,ind){
	var col=$("<td></td>").attr('id','i'+ind);
	htm.append(col);
}

function lista(query)
{
	$.ajax({
		data: {"query":query},
		type: "post",
		url : "table.php",
		success: function(data)
		{
			var reg=eval(data);
			var row='';
			for(var i=0; i<reg.length; i++)
			{

				row='<span class="tp"></span><div id="checkticket" data-checked='+reg[i].check+' data-number='+reg[i].nro+'>'+reg[i].index+'</div><div id="epay" class="epay'+reg[i].nro+'"></div>';
				$('#i'+reg[i].nro).html(row);
				//$('#i'+reg[i].nro).text('<div></div>');
				if(reg[i].pay==1)
				{
					$('.epay'+reg[i].nro).html('<span id="pay" data-number='+reg[i].nro+' data-pay="1" class="ui-icon ui-icon-check ui-state-highlight">');
					
				}
				else
				{
					$('.epay'+reg[i].nro).html('<span data-pay="0" data-number='+reg[i].nro+' id="pay" class="ui-icon ui-icon-closethick ui-state-error">');
				}
				if(reg[i].check==1)
				{
					$('#i'+reg[i].nro).removeClass('uncheck');
					
					$('#i'+reg[i].nro).addClass('check');
				}
				else
				{
					$('#i'+reg[i].nro).removeClass('check');
					$('#i'+reg[i].nro).addClass('uncheck');

				}
				if(reg[i].tipo==2)
				{

					$('#i'+reg[i].nro+'>.tp').html("Pl").addClass('pll');
				}
				else if(reg[i].tipo==1)
				{
					$('#i'+reg[i].nro+'>.tp').html("Pr").addClass('prr');
				}
				else
				{
					$('.tp').html("ot");
				}
			}
			//alert(row);
	
		},
		complete: function(data)
		{
			
			datatable();
			total();
		}
		

	});

	
	//$('#i200').text('ds');
};
function checkticket(number, check)
{
	$.ajax(
	{
		data: {'nro':number, 'chck':check},
		type: "post",
		url : "envticket.php",
		success: function(data)
		{
			$('#resp').html(data);
			setTimeout(function(){
				$('#resp').empty();
			},200)
			
		},
		complete: function(data)
		{
			cell(1,number);
			total();
		}
	});
}
function checkpay(number,pay)
{
	$.ajax(
	{
		data: {'nro':number,'pay':pay},
		type: "post",
		url : "envpay.php",
		success: function(data)
		{
			$('#resp').html(data);
			setTimeout(function(){
				$('#resp').empty();
			},200)
			
		},
		complete: function(data)
		{
			cell(1,number);
			total();
		}
	});
}
function total()
{
	$.ajax(
	{
		type: "post",
		url: "getvalor.php",
		success: function(val)
		{
			var valor=eval(val);
			
			$('#count>span:nth-child(1)').html(valor[0].valor);
			$('#count>span:nth-child(2)').html(valor[0].entregado);
		}
	});
}