# brq-renault-test
Avaliação aplicada no processo seletivo da BRQ para uma vaga de Desenvolvedor NodeJS na Renault.

## Descrição
O projeto envolve a criação de serviços RESTful que permitam a geração de URLs curtas, mediante o envio da URL principal.

## Requisitos
Para que seja realizada a instalação, construção, execução e testes são necessárias as seguintes tecnologias previamente instaladas:

- Git

Para confirmar se já está instalado:
git --version

Caso ainda não esteja instalado:
https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git


- Make

Para confirmar se já está instalado:
make --version

Caso ainda não esteja instalado:
Linux:
sudo apt-get install build-essential

Windows:
http://gnuwin32.sourceforge.net/packages/make.htm


- Docker:

Para confirmar se já está instalado:
docker --version

Caso ainda não esteja instalado:
https://www.docker.com/community-edition#/download


- Docker-compose:
Normalmente, ao instalar o Docker, o Compose também é instalado. Para confirmar se já está instalado:
docker-compose --version

Caso ainda não esteja instalado:
https://docs.docker.com/compose/install/


## Arquitetura
Foi desenvolvida uma arquitetura voltada para microsserviços com os serviços separados em containers Docker que podem ser escalados mediante a demanda necessária. A estrutura básica foi desenvolvida em NodeJS com Express, ambos responsáveis pela gestão e roteamento das requisições HTTP usando REST.
Foi criada uma pequena estrutura de dados relacionais com Postgres também alocado em um container específico contendo os dados estatísticos e um hash baseado no id auto incremental.
Assim como os demais citados acima, também foi criado um container específico para uma base de dados não relacional do tipo chave-valor usando Redis. A principal função desse container é armazenar a URL original e o hash relacionado no Postgres.

## Tecnologias:
- NodeJS: linguagem Javascript backend voltada para a construção das API's;
- Postgres: banco de dados relacional utilizado para armazenamento as informações estatísticas;
- Redis: banco de dados NoSQL chave-valor utilizado para armazenamento das URLs originais e curtas;

## Dependências:
- Gerais
    - bee-queue: persistência de dados para Redis;
    - body-parser: suporte ao parser de conteúdo para requisições HTTP;
    - cors: autentidação no redirecionamento de domínio;
    - date-fns: manipulação de datas;
    - dotenv: leitura de variáveis de ambiente a partir de arquivo .env;
    - express: roteamento e manipulação HTTP para API REST;
    - sequelize: persistência de dados para Postgres;
    - pg: apoio na utilização do Postgres;
    - valid-url: validação do formato URL;
    - youch: tratamento de erros e exceções;
    - yup: validação de dados postados;

- Específicas do ambiente de desenvolvimento
    - eslint: formatação e validação de sintaxe;
    - nodemon: monitora o serviço HTTP do node;
    - prettier: formatação do código;
    - sequelize-cli: execução de testes e migrations através da persistência com Postgres;
    - sucrase: adaptação do código para ES6;

## Instalação
make install

## Testes
make test


## Referências
https://codeforgeek.com/url-shortener-node-js-redis/
https://scalegrid.io/blog/how-to-build-a-url-shortener-with-node-js-and-mongodb/
https://blog.hotmart.com/pt-br/encurtador-de-url/
https://www.codechain.com.br/2018/11/29/aws-experience-encurtador-de-url/
https://dfilitto.com.br/ferramentas/encurtador-de-link/
https://www.encurtador.com.br/
https://developer.aliyun.com/mirror/npm/package/node-short-url
