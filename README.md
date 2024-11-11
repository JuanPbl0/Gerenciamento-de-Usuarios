# Gerenciamento-de-Usuarios
Este projeto é um sistema de gerenciamento de usuários desenvolvido com PHP para a administração de perfis de usuários. Ele oferece funcionalidades essenciais para criar, ler, atualizar e excluir (CRUD) dados de usuários, além de permitir a busca e a exibição de informações em um painel administrativo.

#README - Aplicação Web de Cadastro de Usuários

#Descrição
Esta aplicação web permite o gerenciamento de usuários, onde o administrador pode efetuar login, visualizar a lista de usuários cadastrados, buscar, editar, excluir usuários, além de realizar o cadastro de novos usuários com verificações de dados para garantir que as informações sejam únicas e atendam a critérios de segurança.

#Funcionalidades principais:
Login: O administrador pode acessar a plataforma com um login específico (email e senha).
Tela principal: Exibe uma tabela com a lista de usuários cadastrados.
Busca de usuário: Funcionalidade para buscar usuários por nome ou outros critérios.
Edição de usuário: Permite a edição das informações de um usuário já cadastrado.
Exclusão de usuário: Funcionalidade para excluir um usuário.
Cadastro de usuário: A aplicação oferece uma tela para cadastro de novos usuários, com verificação de dados para garantir que o e-mail, CPF e senha sejam válidos e únicos.

#Funcionalidades de Verificação:
Verificação de E-mail: Ao cadastrar um novo usuário, a aplicação verifica se o e-mail já existe no banco de dados.
Verificação de CPF: O CPF é verificado para garantir que não haja duplicidade de dados no banco.
Verificação de Senha: A senha deve atender a requisitos de segurança (como comprimento mínimo, caracteres especiais, números, etc.), garantindo que o cadastro seja realizado apenas com senhas fortes.
Confirmação de Senha: O usuário deve confirmar a senha durante o cadastro, para evitar erros de digitação.

#Como Usar
#1. Acesso à aplicação

#2. Login
Para acessar a plataforma, use as credenciais de login fornecidas:

E-mail: admin@xpto.com
Senha: admin123
Após o login, você será redirecionado para a tela principal, onde poderá visualizar a lista de usuários e realizar outras ações.

#3. Tela principal
Na tela principal, você verá uma tabela com os usuários cadastrados. Cada linha da tabela contém as informações do usuário, incluindo:

ID
Nome
E-mail
CPF
Gênero
Data de nascimento

A partir dessa tabela, é possível:

Buscar um usuário usando o campo de pesquisa.
Editar um usuário clicando no ícone de edição.
Excluir um usuário clicando no ícone de exclusão.

#4. Cadastro de novo usuário
Na tela principal, você pode cadastrar novos usuários clicando no botão Cadastrar. Ao clicar no botão, será exibido um formulário com os seguintes campos:

Nome
E-mail (o sistema verifica se o e-mail já existe no banco de dados).
CPF (o sistema verifica se o CPF já está cadastrado).
Email
Telefone
Categoria (se o usuário cadastrado é Administrdor ou Colaborador)
Endereço
Bairro
Cidade
País
UF
Gênero
Data de nascimento
Senha (o sistema exige uma senha que atenda aos requisitos de segurança).
Confirmar senha (para garantir que não haja erro de digitação).
Requisitos para a senha:
Pelo menos 8 caracteres.
Deve conter pelo menos uma letra maiúscula.
Deve conter pelo menos um número.
Deve conter pelo menos um caractere especial (como @, #, !, etc.).
Após preencher todos os campos, clique em Cadastrar para adicionar o usuário ao sistema.

#5. Edição de usuário
Na tabela de usuários, cada linha possui um ícone de editar. Ao clicar nesse ícone, você pode alterar as informações do usuário, como nome, e-mail, CPF, etc. Após editar os dados, clique em Salvar para confirmar as mudanças.

#6. Exclusão de usuário
Na tabela de usuários, cada linha possui um ícone de exclusão. Ao clicar nesse ícone, o usuário será removido do sistema após uma confirmação de exclusão.

#Tecnologias Utilizadas
Frontend: HTML, CSS, JavaScript, AJAX (com Bootstrap para responsividade e estilização).
Backend: PHP, API RESTful (com métodos GET e POST).
Banco de Dados: MySQL.
Validação de Dados: JavaScript (no frontend) e validações no backend (como verificações de CPF e e-mail).
