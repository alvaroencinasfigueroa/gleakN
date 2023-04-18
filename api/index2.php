<?php

include 'bd/bd.php';

header('Access-Control-Allow-Origin: *');


//obtener todos los datos
if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from usuarioadmi where id=".$_GET['id'];
        $resultado=metodoGet1($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from usuarioadmi";
        $resultado=metodoGet1($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

//agregar nuevo usuarioadmi
if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $nombre=$_POST['nombre'];
    $correo=$_POST['correo'];
    $password=$_POST['password'];
    $celular=$POST['celular'];
    $query="insert into usuarioadmi(nombre, correo, password, celular) values ('$nombre', '$correo', '$password', '$celular')";
    $queryAutoIncrement="select MAX(id) as id from usuarioadmi";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>



