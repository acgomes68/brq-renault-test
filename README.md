# brq-renault-test
Avaliação aplicada no processo seletivo da BRQ para uma vaga de Desenvolvedor NodeJS na Renault.

## Descrição
O projeto envolve a criação de serviços RESTful que permitam a geração de URLs curtas, mediante o envio da URL principal.

## Requisitos
Para que seja realizada a instalação, construção, execução e testes são necessárias as seguintes tecnologias previamente instaladas:
- Git
- Docker

## Arquitetura
Foi desenvolvida uma arquitetura voltada para microsserviços com os serviços separados em containers Docker que podem ser escalados mediante a demanda necessária. A estrutura básica foi desenvolvida em NodeJS com Express, ambos responsáveis pela gestão e roteamento das requisições HTTP usando REST.
Foi criada uma pequena estrutura de dados relacionais com Postgres também alocado em um container específico.

## Tecnologias:
- NodeJS: linguagem Javascript backend voltada para a construção das API's;
- Postgres: banco de dados relacional utilizado para armazenamento

## Dependências:
- Gerais
    - date-fns: manipulação de datas;
    - dotenv: leitura de variáveis de ambiente a partir de arquivo .env;
    - express: roteamento e manipulação HTTP para API REST;
    - sequelize: persistência de dados para Postgres;
    - youch: tratamento de erros e exceções;
    - yup: validação de dados postados;

- Específicas do ambiente de desenvolvimento
    - eslint: formatação e validação de sintaxe;
    - nodemon: monitora o serviço HTTP do node;
    - prettier: formatação do código;
    - sequelize-cli: execução de testes e migrations através da persistência com Postgres;
    - sucrase: adaptação do código para ES6;


## Instalação


## Testes

