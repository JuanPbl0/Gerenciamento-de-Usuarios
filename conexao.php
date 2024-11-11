<?php
// Declaração das variáveis de conexão
$servidor   = "localhost";
$basedados  = "xpto_db";
$usuario    = "root";
$senha      = "123456";
$porta      = "3306";

// Conexão com banco de dados
$mysqli = mysqli_connect($servidor, $usuario, $senha, $basedados, $porta);

// Verifica se houve falha ao conectar
if ($mysqli->connect_error){
    die("Falha ao conectar" . $mysqli->connect_error);
}