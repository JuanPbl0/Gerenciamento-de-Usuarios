<?php

include_once("conexao.php");

// Obtém o termo de busca via GET, com tratamento para evitar ataques SQL Injection
$termoBusca = isset($_GET['search']) ? $_GET['search'] : '';

// Prepara o SQL para realizar uma busca em múltiplos campos
$sql = "SELECT ID_CADASTRO, NOME, CPF, EMAIL, TELEFONE, GENERO, DATA_NASC FROM tb_cadastro WHERE 
        ID_CADASTRO LIKE ? OR
        NOME LIKE ? OR 
        CPF LIKE ? OR 
        EMAIL LIKE ? OR 
        TELEFONE LIKE ? OR 
        GENERO LIKE ? OR 
        DATA_NASC LIKE ?";

// Prepara a consulta SQL no banco de dados
$stmt = $mysqli->prepare($sql);

// Cria o termo de busca com o caractere coringa "%" para buscar ocorrências parciais
$termoBusca = "%$termoBusca%";

// Faz o bind dos parâmetros - todos os campos são do tipo string para LIKE
$stmt->bind_param("sssssss", $termoBusca, $termoBusca, $termoBusca, $termoBusca, $termoBusca, $termoBusca, $termoBusca);

// Executa a consulta
$stmt->execute();

// Obtém o resultado da consulta
$result = $stmt->get_result();

// Inicializa um array para armazenar os dados dos usuários encontrados
$usuarios = [];

// Itera pelos resultados e armazena cada linha no array
while ($usuario = $result->fetch_assoc()) {
    $usuarios[] = $usuario;
}

// Retorna o array de resultados em formato JSON
echo json_encode($usuarios);

// Fecha a conexão
$stmt->close();
$mysqli->close();