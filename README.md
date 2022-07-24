# Projeto API de Investimentos :dollar:

<div align="center">
 <img src="./public/assets/images/readme-banner.png" alt="Ilustração de uma mulher olhando o notebook e atrás, contém um dashboard" width="1000">
</div>

<h2>Índice</h2>

 :round_pushpin: [Sobre](#sobre)<br />
 :round_pushpin: [Demo](#demo)<br />
 :round_pushpin: [Tecnologias](#tecnologias)<br />
 :round_pushpin: [Decisões](#decisoes)<br />
 :round_pushpin: [Usabilidade](#usabilidade)<br />
 :round_pushpin: [Orientações](#orientacoes)<br />
 :round_pushpin: [Documentação](#documentacao)<br />
 :round_pushpin: [Scripts](#scripts)<br />
 :round_pushpin: [Testes](#testes)<br />
 :round_pushpin: [DER](#der)<br />
 :round_pushpin: [Arquitetura](#arquitetura)<br />
 :round_pushpin: [Referências](#referencias)<br />
 
<h2 id="sobre">Sobre</h2>

Esta aplicação tem como objetivo gerenciar investimentos em ações, com algumas funcionalidades de conta digital :bulb:

 - Esta é uma aplicação em `Node.js` com `Express` usando o pacote `Sequelize` para fazer um CRUD de investimentos.
 - Esta aplicação seguiu os princípios do REST e se conecta ao banco de dados `postgreSQL` através do [supabase](https://supabase.com/).
 - Para acessar a API, é necessário que a pessoa usuária faça login com suas credencias e isso será autenticado e autorizado via JWT com a geração de token.
 - É possível também que a pessoa usuária possa se cadastrar e utilizar a API, a partir disso é gerado um token para acesso a API.
 
 <h2 id="demo">Demo</h2>
  
> :information_source: Para acessar o deploy da aplicação, clique [aqui](https://bc-invest-api.herokuapp.com/) :rocket:

> :information_source: Acesse a documentação [aqui](https://bc-invest-api.herokuapp.com/docs) e simule a usabilidade :rocket:

<h2 id="tecnologias">Tecnologias</h2>

<div>
  <img title="JavaScript" alt="JavaScript" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img title="NodeJS" alt="NodeJS" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg">
  <img title="Express" alt="Express" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg">
  <img title="Sequelize" alt="Sequelize" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sequelize/sequelize-original.svg">
  <img title="JWT" alt="JWT" height="30" width="30" src="./public/assets/images/jwt.png">
  <img title="Docker" alt="Docker" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg">
  <img title="PostgreSQL" alt="PostgreSQL" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg">
  <img title="Mocha" alt="Mocha" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg" />
  <img title="Chai" alt="Chai" height="30" width="30" src="./public/assets/images/chai.png">
</div>

<h2 id="decisoes">Decisões</h2>

<details>

 <summary id="env"><strong>:bulb: Clique aqui e entenda melhor as minhas escolhas para elaborar este projeto</strong></summary><br/>

 <img title="ESLint" alt="ESLint" height="20" width="30" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/eslint/eslint-original.svg"> [ESLint](https://eslint.org/)

- O projeto possui regras estritas de ESLint (Airbnb) para JavaScript onde é possível encontrar e corrigir problemas, seguindo boas práticas e padronização.

 <img title="JavaScript" alt="JavaScript" height="20" width="30" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg"> [JavaScript](https://www.javascript.com/)
 
 - Além de ser uma linguagem de fácil usabilidade, traz dinamicidade e compatilidade com navegadores modernos, sendo assim uma linguagem de programação ao lado do cliente.

<img title="Docker" alt="Docker" height="20" width="30" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg"> [Docker](https://www.docker.com/)

- Utilizar imagens Docker para empacotar toda a aplicação e suas dependências, torna a distribuição mais fácil, segura e padronizada.

<img title="Sequelize" alt="Sequelize" height="20" width="30" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sequelize/sequelize-original.svg"> [Sequelize](https://sequelize.org/)

- Como uma das bibliotecas de ORM mais conhecidas, o Sequelize foi utilizado nesse projeto pois o código se torna mais legível, extensível e de fácil manutenção.

<img title="PostgreSQL" alt="Sequelize" height="20" width="30" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg"> [PostegreSQL](https://postgresql.org/)

- Além da usabilidade simples, ele suporta um intenso fluxo de dados com garantia de estabilidade e segurança.

<img title="JWT" alt="JWT" height="15" width="15" src="./public/assets/images/jwt.png"> [JWT](https://jwt.io/)

- Os JSON Web Tokens representam a autenticação e autorização de forma eficaz e simples.

<img title="Mocha" alt="Mocha" height="20" width="30" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg" /> [Mocha](https://mochajs.org/)

- Ele é um framework do JavaScript que roda em Node e no Browser e que permite realizar testes assíncronos.

<img title="Chai" alt="Chai" height="20" width="20" src="./public/assets/images/chai.png"> [Chai](https://www.chaijs.com/)

- Combinando com o Mocha, ele é uma biblioteca de assertion para TDD e BDD que também roda em Node e no Browser.

</details>
 
 <h2 id="usabilidade">Usabilidade</h2>

:pushpin:  Veja a seção de [documentação](#documentacao) para entender melhor como funcionam as rotas.

:pushpin: Veja a seção de [orientações](#orientacoes) antes de rodar a aplicação.

> Faça um clone deste repositório:

- `git@github.com:brenndha-cabral/invest-api.git` 

> Após rodar a aplicação localmente ou pelo docker, você deverá acessar através de:

- `http://localhost:{porta}/{rota}` 

> Algumas sugestões de clientes:

  :bulb: [HTTPie](https://httpie.io/) | :bulb: [Postman](https://www.postman.com/) | :bulb: [Insomnia](https://insomnia.rest/) | :bulb: [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)


<h2 id="orientacoes">Orientações</h2>

<details>

<summary id="env"><strong>:closed_lock_with_key: Arquivos example.env e .env</strong></summary><br/>
  
> :information_source: Você encontrará um arquivo `example.env` onde estarão as variáveis de ambiente utilizadas no projeto, duplique-o e renomeie-o apenas para `.env` e insira os valores nas variáveis de ambiente conforme sua utilização.
<br />
  
</details>

<details>

<summary id="docker"><strong>:whale2: Rodando com Docker x Localmente</strong></summary>

### 👉 Com Docker

> :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up`.

- Esse serviço irá inicializar os containers chamados `invest_api` e `invest_api_db`;

- A partir daqui você pode acessar o container `invest_api` via CLI ou abri-lo no seu editor;

> :information_source: Use o comando `docker exec -it invest_api sh`.

- Ele te dará acesso ao terminal interativo do container criado pelo docker-compose.

> :information_source: Ao rodar o docker-compose, ele automaticamente irá rodar os seguintes scripts:

- `npm install`: Irá instalar todas as dependências;

- `npm run prestart`: Irá rodar os comandos para gerar as migrations e seeders no `invest_api_db`;

- `npm run dev`: Irá rodar a aplicação na porta `3000` pelo `nodemon`, ou adapte o docker-compose e o `.env` caso sinta necessidade.


### 👉 Sem Docker

> :information_source: É necessário que você tenha `npm`, `node` e `postgres` instalados em sua máquina.

> :information_source: Instale as dependências com `npm install`.

> :information_source: Rode a aplicação com `npm run dev` na porta `3000` pelo `nodemon`, ou adapte o `.env` caso sinta necessidade.

</details>

<h2 id="documentacao">Documentação</h2>

> :information_source: Acesse [aqui](https://bc-invest-api.herokuapp.com/docs/) a documentação deste projeto onde constam mais detalhes sobre a estrutura da API.

> Caso não tenha conhecimento em Swagger, clique [aqui](https://www.youtube.com/watch?v=cOhguRdlr5A) e veja como é fácil utilizar.

 - Para que a as rotas sejam consumidas, é necessário que a pessoa usuária faça login. Após o login, o token retornado deve ser inserido em `Try it out` e isso fará com que haja a autenticação e autorização das rotas. 

 - Exceto a rota `POST /clientes` que não necessita de login, neste caso após o cadastro, será retornado um token para então a utilização da API.

<h2 id="scripts">Scripts</h2>

> :information_source: Aqui estão os scripts da aplicação para que você possa utilizar, lembrando que o `docker-compose up` já irá rodar o `npm run prestart` e `npm run dev`.

- `npm run test`: Irá rodar todos os testes unitários e de integração da aplicação;

- `npm run test:mocha`: Irá rodar todos os testes unitários e de integração da aplicação e apresentará um relatório de cobertura;

- `npm run prestart`: Irá rodar os comandos para gerar as migrations e seeders;

- `npm run start`: Irá rodar a aplicação (automaticamente irá rodar o `npm run prestart`);

- `npm run dev`: Irá rodar a aplicação através do `nodemon`, como desenvolvimento;

- `npm run lint`: Irá apontar todas as inconcistências de `lint`;

- `npm run lint-fix`: Irá corrigir o máximo de inconcistências de `lint` automaticamente.

> Sinta-se à vontade para ajustar os scripts de acordo com a sua necessidade.


<h2 id="testes">Testes</h2>

> :information_source: Foram realizados testes de integração com `Mocha` e `Chai` para atingir a cobertura mínima de 80%.

<div align="center">
    <img src="./public/assets/images/tests.jpeg" alt="Relatório de cobertura de testes" width="1000">
</div>

<h2 id="der">Diagrama Entidade Relacionamento</h2>

<details>

<summary id="env"><strong>:chart_with_upwards_trend: Clients | Assets | Orders</strong></summary><br/>

  <div align="center">
    <img src="./public/assets/images/der.png" alt="Diagrama Entidade Relacionamento" width="1000">
  </div>
  
</details>

<h2 id="arquitetura">Arquitetura</h2>

<details>

<summary id="env"><strong>:open_file_folder: Arquitetura MSC</strong></summary><br/>

Este projeto foi elaborado nos padrões da arquitetura MSC onde existem três camadas:

- **Camada de Modelo (M)**: Arquivos que executam as operações do banco de dados, como criar conexões e executar queries;

- **Camada de Serviço (S)**: Arquivos que estruturam as regras de negócio, geralmente é quem chama os métodos definidos na camada de modelo;

- **Camada de Controladores (C)**: Interface mais próxima da pessoa usuária ou de uma requisição, irá processar e chamar as devidas funções da camada de serviço.

<div align="center">
 <img src="./public/assets/images/msc-software-architecture.png" alt="Arquitetura de Software MSC" width="1000">
</div>
  
</details>


<h2 id="referencias">Referências</h2>

> :information_source: Este projeto foi a realização de um case para o cargo de Backend da empresa [XP Inc.](https://www.linkedin.com/company/xp-inc/)
