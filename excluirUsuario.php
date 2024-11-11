<?php

include_once("conexao.php");

$data = json_decode(file_get_contents("php://input"), true);
$idUsuario = $data["id"];

$sql = "DELETE FROM tb_cadastro WHERE ID_CADASTRO = ?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("i", $idUsuario);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Usuário excluído com sucesso!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Erro ao excluir usuário."]);
}
    
$stmt->close();
$mysqli->close();