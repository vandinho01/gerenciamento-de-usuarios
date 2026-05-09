Gerenciamento de Usuários

Descrição do Projeto

Este projeto é uma aplicação web simples para o gerenciamento de usuários, desenvolvida com HTML, CSS e JavaScript puro. Ele oferece funcionalidades básicas de CRUD (Criar, Ler, Atualizar, Excluir) para usuários, com persistência de dados utilizando o localStorage do navegador. A interface é construída com o framework AdminLTE, proporcionando um design responsivo e moderno.

Funcionalidades

•
Cadastro de Usuários: Adicione novos usuários com informações como nome, gênero, data de nascimento, país, e-mail, senha e foto.

•
Listagem de Usuários: Visualize todos os usuários cadastrados em uma tabela paginada.

•
Edição de Usuários: Atualize as informações de usuários existentes.

•
Exclusão de Usuários: Remova usuários do sistema.

•
Validação de Formulário: Validação básica dos campos do formulário de cadastro e edição.

•
Persistência de Dados: Todos os dados são armazenados localmente no navegador utilizando localStorage.

•
Contagem de Usuários: Exibe o número total de usuários e administradores.

Tecnologias Utilizadas

•
HTML5: Estrutura da página web.

•
CSS3: Estilização da interface.

•
JavaScript (ES6+): Lógica de negócio e interatividade.

•
AdminLTE: Framework de template para painéis administrativos, baseado em Bootstrap.

•
Bootstrap: Framework CSS para desenvolvimento responsivo e mobile-first.

Estrutura do Projeto

O projeto segue uma estrutura de pastas organizada:

Plain Text


. 
├── bower_components/  # Dependências front-end (Bootstrap, Font Awesome, Ionicons)
├── classes/           # Classes auxiliares (ex: Utils.js)
├── controllers/       # Controladores JavaScript (ex: UserController.js)
├── dist/              # Arquivos de distribuição (CSS e JS do AdminLTE, imagens)
├── models/            # Modelos de dados JavaScript (ex: User.js)
├── index.html         # Página principal da aplicação
├── index.js           # Script principal da aplicação



Como Rodar o Projeto

Para executar este projeto localmente, siga os passos abaixo:

1.
Clone o repositório:

Bash


git clone https://github.com/vandinho01/gerenciamento-de-usuarios.git





2.
Navegue até o diretório do projeto:

Bash


cd gerenciamento-de-usuarios





3.
Abra o arquivo index.html:

Simplesmente abra o arquivo index.html em seu navegador web. Não é necessário um servidor web para esta aplicação, pois ela utiliza apenas recursos do lado do cliente.



Uso

Ao abrir o index.html, você será direcionado para a tela de gerenciamento de usuários. A partir daí, você pode:

•
Preencher o formulário à direita para adicionar um novo usuário.

•
Utilizar os botões
Editar e Excluir na tabela para modificar ou remover usuários existentes.

Contribuição

Contribuições são bem-vindas! Se você tiver sugestões de melhorias, novas funcionalidades ou encontrar algum bug, sinta-se à vontade para abrir uma issue ou enviar um pull request.

