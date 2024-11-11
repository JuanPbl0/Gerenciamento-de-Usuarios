<?php

include_once("conexao.php");
function validarSenha($senha1, $senha2) {
  // Verifica se as senhas são iguais 
if ($senha1 !== $senha2) {
    return false; 
} 
  // Expressão regular para verificar a força da senha 
$padrao = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/";
  // Verifica se a senha corresponde ao padrão 
    return preg_match($padrao, $senha1); 
} 

if (validarSenha($senha1, $senha2)) {
    echo "As senhas são iguais e válidas!";
} else {
    echo "As senhas não são iguais. Por favor, verifique."; }  