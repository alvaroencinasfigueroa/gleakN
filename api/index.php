<?php

include 'bd/bd.php';

header('Access-Control-Allow-Origin: *');

//obtener todos los datos
if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from registrovehiculos where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from registrovehiculos";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

//agregar nuevo vehículo
if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $placa=$_POST['placa'];
    $marca=$_POST['marca'];
    $modelo=$_POST['modelo'];
    $color=$POST['color'];
    $nombreCliente=$POST['nombrecliente'];
    $query="insert into registrovehiculos(placa, marca, modelo, color, nombrecliente) values ('$placa', '$marca', '$modelo', '$color', '$nombreCliente')";
    $queryAutoIncrement="select MAX(id) as id from registrovehiculos";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

//editar datos del vehículo
if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $placa=$_POST['placa'];
    $marca=$_POST['marca'];
    $modelo=$_POST['modelo'];
    $color=$POST['color'];
    $nombreCliente=$POST['nombrecliente'];
    $query="UPDATE registrovehiculos SET placa='$placa', marca='$marca', modelo='$modelo', color='$color', nombreliente='$nombreCliente' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

//elimnar vehículo
if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $query="DELETE FROM registrovehiculos WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>