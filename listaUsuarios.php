<?php

header ("Content-Type: application/json"); 
include_once("conexao.php");

$sql = "SELECT ID_CADASTRO, NOME, CPF, EMAIL, TELEFONE, GENERO, DATA_NASC FROM  tb_cadastro WHERE ID_CADASTRO > 0";

$stmt = $mysqli -> prepare($sql);

$stmt->execute();

$result = $stmt -> get_result();

$usuarios = array();

while($row = $result -> fetch_assoc()){
    $usuarios[] = array (
    "id"               => $row["ID_CADASTRO"],
    "nome"             => $row["NOME"],
    "cpf"              => $row["CPF"],
    "email"            => $row["EMAIL"],
    "telefone"         => $row["TELEFONE"],        
    "genero"           => $row["GENERO"],        
    "dataNasc"         => $row["DATA_NASC"],        
    );
}

exit(json_encode($usuarios));