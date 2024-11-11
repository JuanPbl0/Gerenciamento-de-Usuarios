<?php

include_once("conexao.php");

$idUsuario = isset($_GET["id"]) ? $_GET["id"] : 0;

$sql = "SELECT ID_CADASTRO, NOME, CPF, EMAIL, TELEFONE, GENERO, DATA_NASC, CATEGORIA, ENDERECO, BAIRRO, CIDADE, PAIS, UF FROM tb_cadastro WHERE ID_CADASTRO = ? LIMIT 1";

$stmt = $mysqli -> prepare($sql);

$stmt->bind_param("i", $idUsuario);
//i - int
//d - float
//s - string
//b - blob


$stmt->execute();

$result = $stmt->get_result();

$usuario = $result->fetch_assoc();

exit(json_encode($usuario));