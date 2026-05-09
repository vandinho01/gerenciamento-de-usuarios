Gerenciamento de Usuários
Aplicação web para gerenciamento de usuários com funcionalidades de CRUD completo, desenvolvida com HTML, CSS e JavaScript puro.
Funcionalidades

Cadastro de Usuários — nome, gênero, data de nascimento, país, e-mail, senha e foto
Listagem de Usuários — tabela com todos os usuários cadastrados
Edição de Usuários — atualização de informações de usuários existentes
Exclusão de Usuários — remoção de usuários do sistema
Validação de Formulário — validação dos campos com feedback visual (borda vermelha)
Persistência de Dados — dados armazenados via localStorage do navegador
Contadores — exibe total de usuários e administradores

Tecnologias

HTML5 — estrutura da página
CSS3 — estilização da interface
JavaScript ES6+ — lógica de negócio e interatividade
AdminLTE — template de painel administrativo baseado em Bootstrap
Bootstrap — framework CSS responsivo

Estrutura do Projeto
.
├── bower_components/   # Dependências front-end (Bootstrap, Font Awesome, Ionicons)
├── classes/            # Classes auxiliares (ex: Utils.js)
├── controllers/        # Controladores JavaScript (ex: UserController.js)
├── dist/               # Arquivos de distribuição (CSS, JS e imagens do AdminLTE)
├── models/             # Modelos de dados (ex: User.js)
├── index.html          # Página principal
└── index.js            # Script de entrada da aplicação
Como Rodar
Não é necessário servidor web — a aplicação roda inteiramente no navegador.

Clone o repositório:

bashgit clone https://github.com/vandinho01/gerenciamento-de-usuarios.git

Acesse o diretório:

bashcd gerenciamento-de-usuarios

Abra o index.html diretamente no navegador.

Como Usar

Preencha o formulário lateral para cadastrar um novo usuário
Use os botões Editar e Excluir na tabela para gerenciar usuários existentes
Campos obrigatórios (nome, e-mail e senha) são sinalizados com borda vermelha quando não preenchidos

Contribuição
Contribuições são bem-vindas! Abra uma issue para reportar bugs ou sugerir melhorias, ou envie um pull request com suas alterações.
