<?php

include_once("conexao.php");

$idUsuario  = isset($_POST["id"]) ? $_POST["id"] : 0;
$nome       = isset($_POST['nome']) ? $_POST['nome'] : '';
$email      = isset($_POST['email']) ? $_POST['email'] : '';
$telefone   = isset($_POST['contato']) ? $_POST['contato'] : '';
$categoria  = isset($_POST['categoria']) ? $_POST['categoria'] : '';
$endereco   = isset($_POST['endereco']) ? $_POST['endereco'] : '';
$bairro     = isset($_POST['bairro']) ? $_POST['bairro'] : '';
$cidade     = isset($_POST['cidade']) ? $_POST['cidade'] : '';
$pais       = isset($_POST['pais']) ? $_POST['pais'] : '';
$uf         = isset($_POST['uf']) ? $_POST['uf'] : '';


// Define a SQL básica sem o campo SENHA
$sql = "UPDATE tb_cadastro SET NOME = ?, EMAIL = ?, TELEFONE = ?, CATEGORIA = ?, ENDERECO = ?, BAIRRO = ?, CIDADE = ?, PAIS = ?, UF = ? WHERE ID_CADASTRO = ?";
$params = [$nome, $email, $telefone, $categoria, $endereco, $bairro, $cidade, $pais, $uf, $idUsuario];
$types = "sssssssssi";  // Tipos de parâmetros para bind_param


// Prepara a declaração SQL
$stmt = $mysqli->prepare($sql);

// Faz o bind dos parâmetros
$stmt->bind_param($types, ...$params);

// Executa a atualização e verifica o resultado
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Usuário atualizado com sucesso!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Erro ao atualizar usuário."]);
}

// Fecha a declaração e a conexão
$stmt->close();
$mysqli->close();