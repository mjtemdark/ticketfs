<?php
	require_once("on.php");
	$res=$db->query("SELECT tk.nro, tk.marcado, t.tipo, tk.pagado,tk.ind, e.nombres, e.apellidos FROM tickets tk 
	LEFT JOIN estudiantes e ON tk.estudiante_cod=e.codigo 
	LEFT JOIN tipo_ticket t ON tk.tipo_ticket=t.id 
	ORDER BY nro ASC;");
	if($res):
		
	while($row=$res->fetchArray())

	{
		$data[]=['nro'=>$row['nro'],'check'=>$row['marcado'],'pay'=>$row['pagado'],
				'name'=>$row['apellidos']." ".$row['nombres'],
				'tipo'=>$row['tipo'],
				'ind'=>$row['ind']
	];
		
	}
	echo json_encode($data);
	else:
		echo "error".$res->error();
endif;
	require_once("off.php");
?>