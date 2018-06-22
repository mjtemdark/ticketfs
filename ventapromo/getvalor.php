<?php
	require_once("on.php");
	$res=$db->query("select sum(valor) as valor from tickets where pagado=1");
	$res2=$db->query("select count(*) as entregados from tickets where marcado=1");
	if($res==TRUE&&$res2==TRUE):
		
	$row=$res->fetchArray();
	$row2=$res2->fetchArray();

		$data[]=['valor'=>$row['valor'],'entregado'=>$row2['entregados']];
		
	echo json_encode($data);
	else:
		echo "error".$res->error();
endif;
	require_once("off.php");
?>