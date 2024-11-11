<?php

include_once("conexao.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'] ?? '';
    $cpf = $_POST['cpf'] ?? '';
    $email = $_POST['email'] ?? '';
    $telefone = $_POST['contato'] ?? '';
    $categoria = $_POST['categoria'] ?? '';
    $endereco = $_POST['endereco'] ?? '';
    $bairro = $_POST['bairro'] ?? '';
    $cidade = $_POST['cidade'] ?? '';
    $pais = $_POST['pais'] ?? '';
    $uf = $_POST['uf'] ?? '';
    $genero = $_POST['genero'] ?? '';
    $dataNasc = $_POST['dataNasc'] ?? '';
    $senha = $_POST['senha'] ?? '';
    $confirmarSenha = $_POST['confirmarSenha'] ?? '';

    // Validação de senha
    if ($senha != $confirmarSenha) {
        echo json_encode(["status" => "error", "message" => "As senhas não coincidem."]);
        exit;
    }

    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    // Inserir no banco
    $sql = "INSERT INTO tb_cadastro (NOME, CPF, EMAIL, TELEFONE, CATEGORIA, ENDERECO, BAIRRO, CIDADE, PAIS, UF ,GENERO, DATA_NASC, SENHA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("sssssssssssss", $nome, $cpf, $email, $telefone, $categoria, $endereco, $bairro, $cidade, $pais, $uf, $genero, $dataNasc, $senhaHash);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Usuário cadastrado com sucesso!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erro ao cadastrar usuário."]);
    }

    $stmt->close();
    $mysqli->close();
}