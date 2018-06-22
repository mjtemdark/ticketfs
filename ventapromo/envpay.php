<?php
	require_once("on.php");
		$pay=$_POST['pay'];
		if($pay==0)
		{
		$id=$_POST['nro'];
		//echo ($id);
		$sql="UPDATE tickets SET pagado=1 WHERE nro=".$id.";";
		$res=$db->query($sql);
		if($res):
			echo "Actualizado";
		else:
			echo "No se actualizo";
		endif;	
		}
		else
		{
		$id=$_POST['nro'];
		//echo ($id);
		$sql="UPDATE tickets SET pagado=0 WHERE nro=".$id.";";
		$res=$db->query($sql);
		if($res):
			echo "Actualizado";
		else:
			echo "No se actualizo";
		endif;	
		}
		

	require_once("off.php");
?>