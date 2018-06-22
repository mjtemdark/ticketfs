<?php
	require_once("on.php");
	$var=$_POST['query'];
	if($var==0)
	{
	
	$res=$db->query("SELECT nro, tipo_ticket, marcado, pagado, ind FROM tickets ORDER BY nro ASC;");
	if($res):
		
	while($row=$res->fetchArray())

	{
		$data[]=['nro'=>$row['nro'],'check'=>$row['marcado'],'pay'=>$row['pagado'],'tipo'=>$row['tipo_ticket'],
		'index'=>preg_replace('/[^0-9]+/', '', $row['ind']) 
	];
		
	}
	echo json_encode($data);
	else:
		echo "error".$res->error();
endif;
}
else
{
	$id=$_POST['id'];
	$res=$db->query("SELECT nro, tipo_ticket, marcado, pagado, ind FROM tickets WHERE nro=".$id.";");
	if($res):
		
	$row=$res->fetchArray();

	
		$data[]=['nro'=>$row['nro'],'check'=>$row['marcado'],'pay'=>$row['pagado'],'tipo'=>$row['tipo_ticket'],
		'index'=>preg_replace('/[^0-9]+/', '', $row['ind']) 
		];
		
	
	echo json_encode($data);
	else:
		echo "error".$res->error();
endif;
	
}
require_once("off.php");
?>