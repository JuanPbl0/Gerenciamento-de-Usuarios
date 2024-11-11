<?php
include_once("conexao.php");

$data = json_decode(file_get_contents("php://input"), true);

// Extrai os valores de CPF e e-mail
$cpf = isset($data['cpf']) ? $data['cpf'] : '';
$email = isset($data['email']) ? $data['email'] : '';

// Verificando se o CPF já está cadastrado
$sqlCpf = "SELECT COUNT(*) FROM tb_cadastro WHERE CPF = ?";
$stmtCpf = $mysqli->prepare($sqlCpf);
$stmtCpf->bind_param("s", $cpf);
$stmtCpf->execute();
$stmtCpf->store_result(); // Armazena os resultados para poder usar o bind_result

$stmtCpf->bind_result($cpfCount);
$stmtCpf->fetch();

// Verificando se o e-mail já está cadastrado
$sqlEmail = "SELECT COUNT(*) FROM tb_cadastro WHERE EMAIL = ?";
$stmtEmail = $mysqli->prepare($sqlEmail);
$stmtEmail->bind_param("s", $email);
$stmtEmail->execute();
$stmtEmail->store_result(); // Armazena os resultados para poder usar o bind_result

$stmtEmail->bind_result($emailCount);
$stmtEmail->fetch();

// Verificando as condições
if ($cpfCount > 0) {
    echo json_encode(["status" => "error", "message" => "CPF já cadastrado."]);
} elseif ($emailCount > 0) {
    echo json_encode(["status" => "error", "message" => "E-mail já cadastrado."]);
} else {
    echo json_encode(["status" => "success", "message" => "Cadastro disponível."]);
}

// Fechando as conexões
$stmtCpf->close();
$stmtEmail->close();
$mysqli->close();