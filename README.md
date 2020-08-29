# brq-renault-test
Teste aplicado no processo seletivo da BRQ para uma vaga na Renault

Tecnologias:
- NodeJS: linguagem Javascript backend voltada para a construção das API's;
- Postgres: banco de dados relacional utilizado para armazenamento
- MongoDB: banco de dados não relational utilizado para armazenamento
- Redis: banco de dados não relacional utilizado para controle de filas

Dependências:
- Gerais
    - bee-queue: persistência de dados para Redis;
    - date-fns: manipulação de datas;
    - dotenv: leitura de variáveis de ambiente a partir de arquivo .env;
    - express: roteamento e manipulação HTTP para API REST;
    - mongoose: persistência de dados para MongoDB;
    - sequelize: persistência de dados para Postgres;
    - youch: tratamento de erros e exceções;
    - yup: validação de dados postados;

- Específicas do ambiente de desenvolvimento
    - eslint: formatação e validação de sintaxe;
    - nodemon: monitora o serviço HTTP do node;
    - prettier: formatação do código;
    - sequelize-cli: execução de testes e migrations através da persistência com Postgres;
    - sucrase: adaptação do código para ES6;
