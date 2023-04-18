<?php

include 'bd/bd.php';

header('Access-Control-Allow-Origin: *');

//obtener todos los datos
if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from informaciónclientes where id=".$_GET['id'];
        $resultado=metodoGet1($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from informacionclientes";
        $resultado=metodoGet1($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");

?>