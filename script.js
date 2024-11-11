function editarDados() { 

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    
    // Coleta dos dados do formulário 
    const nome = document.getElementById('nome').value; 
    const email = document.getElementById('email').value;   
    const telefone = document.getElementById('contato').value;
    const categoria = document.getElementById('categoria').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;    
    const cidade = document.getElementById('cidade').value;
    const pais = document.getElementById('pais').value;
    const uf = document.getElementById('uf').value;    
    // const senha = document.getElementById('senha').value;
    // const confirmarSenha = document.getElementById('confirmarSenha').value; 
    
    // // Verifica se a senha e a confirmação coincidem
    // if (senha && senha !== confirmarSenha) {
    //     alert("As senhas não coincidem!");
    //     return;
    // }

    // Cria um objeto FormData para enviar os dados     
    const formData = new FormData();  
    formData.append('id', userId);  
    formData.append('nome', nome);    
    formData.append('email', email); 
    formData.append('contato', telefone); 
    formData.append('categoria', categoria); 
    formData.append('endereco', endereco); 
    formData.append('bairro', bairro); 
    formData.append('cidade', cidade);
    formData.append('pais', pais); 
    formData.append('uf', uf);
    // if (senha) formData.append('senha', senha); // Apenas envia a senha se ela foi preenchida       
    
    // Envia os dados para o arquivo PHP usando fetch 
    fetch('editarUsuario.php', {
        method: 'POST', 
        body: formData 
    })         
    .then(response => response.json()) 
    .then(data => {
        console.log(data);
        
        if (data.status === "success") {
            alert("Usuário atualizado com sucesso!");
            window.location.href = "principal.html";
        } else {
            alert("Erro ao atualizar usuário: " + data.message);
        } 

        // Exibe a mensagem de sucesso ou erro retornada pelo PHP 
    }) 
    .catch(error => {
         console.error('Erro ao salvar os dados:', error); 
    }); 
}

// Script para deletar usuários
const excluirRegistro = (event, id) => {
    event.stopPropagation();

    // Usando confirm para confirmação de exclusão
    const confirmacao = confirm("Tem certeza que deseja excluir este usuário?");
    
    if (confirmacao) {
        // Chama a função para excluir o registro
        deleteUser(id);
    }
};

// Script para deletar usuários
const deleteUser = (id) => {
    console.log("ID a ser excluído:", id);
    fetch("excluirUsuario.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    })
    .then(response => {
        console.log("Resposta do servidor:", response);

        if (!response.ok) {
            throw new Error('Erro na rede: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log("Resposta do servidor:", data);
        
        alert(data.message);
        if (data.status === "success") {
            // Atualiza a tabela após a exclusão
            const tabela = document.getElementById("tabela");
            const rows = Array.from(tabela.rows);

            // Iterar ao contrário para evitar problemas de índice
            for (let i = rows.length - 1; i >= 0; i--) {
                if (rows[i].cells[0].innerText == id) {
                    tabela.deleteRow(i); // Exclui a linha correspondente
                }
            }
        }
    })
    .catch(error => {
        console.error("Erro ao excluir usuário:", error);
    });
};


// Script para buscar usuários
function buscarUsuarios() {
    fetch("listaUsuarios.php")
        .then(response => {
            console.log("Resposta bruta:", response);
            return response.json();
        })
        .then(data => {
            console.log("Dados JSON:", data);
            
            const tabela = document.getElementById("tabela");
            tabela.innerHTML = ""; // Limpa a tabela antes de adicionar novos registros

            data.map((usuarios) => {
                const tr = document.createElement("tr");
                tr.style.cursor = "pointer";
                
                tr.innerHTML = `
                    <th scope="row">${usuarios.id}</th>
                    <td>${usuarios.nome}</td>
                    <td>${usuarios.cpf}</td>
                    <td>${usuarios.email}</td>
                    <td>${usuarios.telefone}</td>
                    <td>${usuarios.genero}</td>
                    <td>${formatarData(usuarios.dataNasc)}</td> <!-- Formata a data aqui -->
                    <td>
                        <img src="editar.svg" alt="" style="width: 30px; height: 30px;" onclick="window.location.href='detalheUsuarios.html?id=${usuarios.id}'">
                        <img src="lixeira.svg" alt="" style="width: 30px; height: 30px;" onclick="excluirRegistro(event, ${usuarios.id})">
                    </td>
                `;
                
                tabela.appendChild(tr);
            });
        })
        .catch(erro => {
            console.error("Erro ao buscar os usuários:", erro);
        });
    }

function run() {
    buscarUsuarios();
}
    
// Script para exibir detalhes de usuários
function detalheUsuario() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    console.log("ID do usuário:", userId);
    
    if (userId) {
        fetch(`detalheUsuarios.php?id=${userId}`)
        .then(response => response.json())
        .then(usuario => {
                        
            if (usuario.error) {
                console.error(usuario.error);
                alert('Usuário não encontrado')
            } else {
                document.getElementById("idcodigo").value = usuario.ID_CADASTRO;
                document.getElementById("nome").value = usuario.NOME;
                document.getElementById("cpf").value = usuario.CPF;
                document.getElementById("email").value = usuario.EMAIL;
                document.getElementById("contato").value = usuario.TELEFONE;
                const categoriaSelect = document.getElementById("categoria");
                categoriaSelect.value = usuario.CATEGORIA.toLowerCase();
                document.getElementById("endereco").value = usuario.ENDERECO;
                document.getElementById("bairro").value = usuario.BAIRRO;
                document.getElementById("cidade").value = usuario.CIDADE;
                document.getElementById("pais").value = usuario.PAIS;
                document.getElementById("uf").value = usuario.UF;
                document.getElementById("genero").value = usuario.GENERO;
                document.getElementById("dataNasc").value = usuario.DATA_NASC;
            }    
        })
        .catch(erro => {
            console.error("Erro ao buscar os detalhes do usuário:", erro);
        });
    } else {
        console.error('ID do usuário não encontrado');            
    }
}

document.addEventListener("DOMContentLoaded", detalheUsuario()); 



run();

function formatarData(data) {
    const partes = data.split('-'); // Separa a data no formato 'aaaa-mm-dd'
    if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`; // Retorna no formato 'dd/mm/aaaa'
    }
    return data; // Retorna a data original se não estiver no formato esperado
}


// Função para logar o usuário
function logar() {
    // Obtém os valores inseridos nos campos de email e senha
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Obtém os usuários cadastrados no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se o usuário existe no array de usuários cadastrados
    const usuarioEncontrado = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);

    if (usuarioEncontrado) {
        // Se o usuário for encontrado, redireciona para a página principal
        window.open("principal.html", "_self");
        console.log(`Usuário logado com sucesso: ${usuarioEncontrado.tipoUsuario}`);
    } else {
        // Caso contrário, exibe uma mensagem de erro
        alert("E-mail ou senha incorretos. Tente novamente.");
    }
}


// Função para criar um novo usuário
function usuario(email, senha, tipoUsuario) {
    // Verifica se o tipo de usuário é válido (Admin ou Usuário)
    if (tipoUsuario !== 'Admin' && tipoUsuario !== 'Usuario') {
        console.error("Tipo de usuário inválido. Use 'Admin' ou 'Usuario'.");
        return;
    }

    // Obtém os dados existentes de usuários ou cria um array vazio se não houver nenhum
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Cria o objeto do novo usuário
    const novoUsuario = {
        email: email,
        senha: senha,
        tipoUsuario: tipoUsuario
    };

    // Adiciona o novo usuário ao array de usuários
    usuarios.push(novoUsuario);

    // Salva o array atualizado no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    console.log("Usuário criado com sucesso:", novoUsuario);
}

document.addEventListener("DOMContentLoaded", function() {
    run(); // Chama a função após o carregamento do DOM
});


// Exemplo de uso:
// Criando um administrador
usuario("admin@xpto.com", "admin123", "Admin");


function pesquisarUsuarios() {
    // Obtém o termo de busca do campo de input
    const termoBusca = document.getElementById('searchInput').value;

    // Realiza a requisição para o PHP com o termo de busca
    fetch(`buscarUsuarios.php?search=${encodeURIComponent(termoBusca)}`)
        .then(response => response.json())
        .then(usuarios => {
            // Limpa o conteúdo anterior da tabela
            const tabela = document.getElementById('tabela');
            tabela.innerHTML = '';

            // Itera sobre os usuários encontrados e adiciona à tabela
            usuarios.forEach(usuario => {
                const tr = document.createElement('tr');
                tr.style.cursor = "pointer";
            
                tr.innerHTML = `
                    <th scope="row">${usuario.ID_CADASTRO}</th>
                    <td>${usuario.NOME}</td>
                    <td>${usuario.CPF}</td>
                    <td>${usuario.EMAIL}</td>
                    <td>${usuario.TELEFONE}</td>
                    <td>${usuario.GENERO}</td>
                    <td>${formatarData(usuario.DATA_NASC)}</td> <!-- Formata a data aqui -->
                    <td>
                        <img src="editar.svg" alt="" style="width: 30px; height: 30px;" onclick="window.location.href='detalheUsuarios.html?id=${usuario.ID_CADASTRO}'">
                        <img src="lixeira.svg" alt="" style="width: 30px; height: 30px;" onclick="excluirRegistro(event, ${usuario.ID_CADASTRO})">
                    </td>
                `;

                tabela.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro ao buscar usuários:', error));
}

// Função para abrir a tela de detalhes do usuário
function abrirDetalheUsuario(idUsuario) {
    window.location.href = `detalheUsuarios.html?id=${idUsuario}`;
}

document.getElementById("cpf").addEventListener("input", aplicarMascaraCPF);
document.getElementById("contato").addEventListener("input", aplicarMascaraTelefone);

// Função para aplicar máscara de CPF (###.###.###-##)
function aplicarMascaraCPF() {
    const cpf = this.value.replace(/\D/g, "").slice(0, 11);
    if (cpf.length <= 9) {
        this.value = cpf.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
    } else {
        this.value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
}

// Função para aplicar máscara de telefone com DDD ((##) #####-####)
function aplicarMascaraTelefone() {
    const telefone = this.value.replace(/\D/g, "").slice(0, 11);
    if (telefone.length <= 10) {
        this.value = telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
        this.value = telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
}

// Validação para permitir apenas números no CPF e telefone
document.getElementById("cpf").addEventListener("keypress", permitirSomenteNumeros);
document.getElementById("contato").addEventListener("keypress", permitirSomenteNumeros);

function permitirSomenteNumeros(event) {
    const tecla = String.fromCharCode(event.which);
    if (!/[0-9]/.test(tecla)) {
        event.preventDefault();
    }
}

// Função para enviar os dados do formulário via AJAX
function criarUsuario() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('contato').value;
    const categoria = document.getElementById('categoria').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const pais = document.getElementById('pais').value;
    const uf = document.getElementById('uf').value;
    const genero = document.getElementById('genero').value;
    const dataNasc = document.getElementById('dataNasc').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    // Validando os campos obrigatórios
    if (!nome || !cpf || !email || !telefone || !categoria || !endereco || !bairro || !cidade || !pais || !uf || !genero || !dataNasc || !senha || !confirmarSenha) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    // Validando as senhas
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    // Validando a senha com os requisitos completos
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!senhaRegex.test(senha)) {
        alert("A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.");
        return;
    }

    // Verificando se o CPF ou o E-mail já estão cadastrados (requisição para o servidor)
    fetch('verificarCadastro.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf: cpf, email: email })
    })
    .then(response => {
        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json(); // Tenta converter a resposta para JSON
    })
    .then(data => {
        if (data.status === 'error') {
            // Verificando se o CPF ou o E-mail já estão cadastrados
            if (data.message.includes('CPF')) {
                alert("CPF já cadastrado. Por favor, insira um CPF válido e único.");
            } else if (data.message.includes('E-mail')) {
                alert("E-mail já cadastrado. Por favor, insira um e-mail válido e único.");
            }
            return;
        }

        // Criando o objeto FormData
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('cpf', cpf);
        formData.append('email', email);
        formData.append('contato', telefone);
        formData.append('categoria', categoria);
        formData.append('endereco', endereco);
        formData.append('bairro', bairro);
        formData.append('cidade', cidade);
        formData.append('pais', pais);
        formData.append('uf', uf);
        formData.append('genero', genero);
        formData.append('dataNasc', dataNasc);
        formData.append('senha', senha);
        formData.append('confirmarSenha', confirmarSenha);

        // Enviando os dados para o servidor via AJAX
        fetch('cadastroUsuario.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Cadastro realizado com sucesso!");
                window.location.href = 'principal.html'; // Redireciona para a tela principal após o cadastro
            } else {
                alert("Erro ao realizar o cadastro. Tente novamente.");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar os dados:", error);
            alert("Ocorreu um erro ao processar o cadastro. Tente novamente.");
        });
    })
    .catch(error => {
        // Exibindo o erro no console para ajudar no diagnóstico
        console.error("Erro ao verificar CPF ou e-mail:", error);
        alert("Erro ao verificar CPF ou e-mail. Tente novamente mais tarde.");
    });
}




function voltarParaPaginaPrincipal() {
    window.location.href = 'principal.html'; // Redireciona para a página principal
}

const senhaInput = document.getElementById('senha');

// Função para verificar a senha
senhaInput.addEventListener('input', () => {
    const senha = senhaInput.value;

    // Verificar se a senha tem pelo menos 8 caracteres
    const requisitoCaracteres = document.getElementById('requisito-caracteres');
    if (senha.length >= 8) {
        requisitoCaracteres.style.color = 'green';
        requisitoCaracteres.textContent = '✔ Ter pelo menos 8 caracteres';
    } else {
        requisitoCaracteres.style.color = 'red';
        requisitoCaracteres.textContent = '✖ Ter pelo menos 8 caracteres';
    }

    // Verificar se a senha contém pelo menos 1 letra maiúscula
    const requisitoMaiuscula = document.getElementById('requisito-maiuscula');
    if (/[A-Z]/.test(senha)) {
        requisitoMaiuscula.style.color = 'green';
        requisitoMaiuscula.textContent = '✔ Incluir pelo menos 1 letra maiúscula';
    } else {
        requisitoMaiuscula.style.color = 'red';
        requisitoMaiuscula.textContent = '✖ Incluir pelo menos 1 letra maiúscula';
    }

    // Verificar se a senha contém pelo menos 1 letra minúscula
    const requisitoMinuscula = document.getElementById('requisito-minuscula');
    if (/[a-z]/.test(senha)) {
        requisitoMinuscula.style.color = 'green';
        requisitoMinuscula.textContent = '✔ Incluir pelo menos 1 letra minúscula';
    } else {
        requisitoMinuscula.style.color = 'red';
        requisitoMinuscula.textContent = '✖ Incluir pelo menos 1 letra minúscula';
    }

    // Verificar se a senha contém pelo menos 1 número
    const requisitoNumero = document.getElementById('requisito-numero');
    if (/\d/.test(senha)) {
        requisitoNumero.style.color = 'green';
        requisitoNumero.textContent = '✔ Incluir pelo menos 1 número';
    } else {
        requisitoNumero.style.color = 'red';
        requisitoNumero.textContent = '✖ Incluir pelo menos 1 número';
    }

    // Verificar se a senha contém pelo menos 1 caractere especial
    const requisitoEspecial = document.getElementById('requisito-especial');
    if (/[\W_]/.test(senha)) {
        requisitoEspecial.style.color = 'green';
        requisitoEspecial.textContent = '✔ Incluir pelo menos 1 caractere especial';
    } else {
        requisitoEspecial.style.color = 'red';
        requisitoEspecial.textContent = '✖ Incluir pelo menos 1 caractere especial';
    }
});

function mostrarSenha() {
    const senhaInput = document.getElementById('senha');
    const mostrarSenhaInput = document.getElementById('mostrar-senha');
    
    if (senhaInput.type === 'password') {
        senhaInput.setAttribute('type', 'text');
        mostrarSenhaInput.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    } else {
        senhaInput.setAttribute('type', 'password');
        mostrarSenhaInput.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    }
        
}   