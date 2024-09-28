# 🏋️ Exercita365:1.1

## 📖 Descrição

Exercita365 é uma aplicação backend que fornece uma API REST para gerenciar locais de atividade física na cidade de Florianópolis. Permite que usuários se cadastrem, adicionem e avaliem locais para atividades físicas. A aplicação é construída com Node.js, Express, Sequelize e PostgreSQL.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: `🟢` Ambiente de execução JavaScript do lado do servidor, que permite desenvolver aplicações escaláveis e rápidas utilizando JavaScript.

- **Express**: `🚀` Framework web para Node.js que facilita a criação de APIs e aplicativos web.

- **Sequelize**: `📦` ORM (Object-Relational Mapping) para Node.js que facilita a interação com bancos de dados SQL.

- **PostgreSQL**: `🐘` Sistema de gerenciamento de banco de dados relacional poderoso e de código aberto.

- **Axios**: `🌐` Cliente HTTP baseado em Promises para fazer requisições para APIs.

- **bcryptjs**: `🔒` Biblioteca para hashing de senhas, garantindo segurança no armazenamento.

- **jsonwebtoken**: `🔑` Biblioteca que permite a criação e verificação de tokens JWT, usados para autenticação.

- **dotenv**: `🌱` Pacote que carrega variáveis de ambiente a partir de um arquivo `.env`.

- **swagger-autogen**: `📜` Gera automaticamente a documentação da API utilizando o Swagger.

- **swagger-ui-express**: `📊` Integra a interface Swagger UI com Express.

- **nodemon**: `🔄` Ferramenta que reinicia automaticamente o servidor durante o desenvolvimento.

## 🔧 Pré-requisitos

Antes de começar, verifique se você tem as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## ⚙️ Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/FuturoDEV-Fitness/M3P-BackEnd-squad3.git
   cd exercita365
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
   ```

4. Execute as migrações para criar as tabelas no banco de dados:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. Inicie o servidor:

   ```bash
   npm start
   ```

   Para desenvolvimento com reinicialização automática:

   ```bash
   npm run dev
   ```

## 📡 Endpoints

- **POST** `/login`: Login no sistema.
- **POST** `/users`: Cadastro de novos usuários.
- **GET** `/users`: Listagem de usuários.
- **PUT** `/users/:id`: Edição de informações do usuário.
- **DELETE** `/users/:id`: Exclusão de um usuário.
- **GET** `/dashboard`: Visão geral dos dados.
- **POST** `/locations`: Cadastro de locais para atividade física.
- **GET** `/locations`: Listagem de locais para atividade física.
- **PUT** `/locations/:id`: Edição de informações do local.
- **DELETE** `/locations/:id`: Exclusão de um local para atividade física.

## 📦 Migrations

As migrations são uma parte fundamental do gerenciamento do banco de dados na aplicação. Elas permitem que você crie, modifique e mantenha a estrutura do banco de dados de forma versionada e controlada.

Neste projeto, utilizamos o Sequelize para gerenciar as migrations, o que facilita a criação e o gerenciamento das tabelas e suas relações. As migrations garantem que a estrutura do banco de dados esteja sempre sincronizada com o código da aplicação, permitindo que todos os desenvolvedores trabalhem com a mesma base de dados.

Para visualizar a modelagem das tabelas e as migrations correspondentes, consulte o arquivo anexado abaixo.

![alt text](src/assets/img/image.png)

## 🚀 Deploy

Para fazer o deploy do projeto, você pode usar serviços como Render. Certifique-se de que o Dockerfile e docker-compose.yaml estão configurados corretamente para gerar a imagem Docker da aplicação e o banco de dados PostgreSQL.

## 🤝 Contribuição

Sinta-se à vontade para abrir Issues e Pull Requests. Siga as seguintes convenções de commit:

- **feat**: Adicionar um novo recurso.
- **fix**: Corrigir um bug.
- **docs**: Atualizar a documentação.
- **style**: Alterações de estilo de código (formatação, etc).
- **refactor**: Refatorar o código.
- **test**: Adicionar ou corrigir testes.
- **chore**: Atualizações em tarefas de manutenção (builds, pacotes, etc).

  ## Melhorias

- Criar uma tabela de somente de exercícios

## 👤 Autores

hiediferreira, juniorpinhodev, ThaisEFAG
