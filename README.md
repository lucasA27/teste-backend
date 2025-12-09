# API de Notícias (NestJS)

Esta é uma API RESTful desenvolvida em NestJS para gerenciar "Notícias" e consultar endereços via CEP.

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construção de aplicações server-side eficientes e escaláveis.
- **TypeORM**: ORM para TypeScript e JavaScript.
- **PostgreSQL**: Banco de dados relacional.
- **Docker & Docker Compose**: Containerização e orquestração.
- **Class Validator**: Validação de dados.
- **Axios**: Cliente HTTP para integrações externas.
- **Swagger**: Documentação da API.

## Estrutura do Projeto e Justificativa

A estrutura segue o padrão modular do NestJS, reforçada pelo **Repository Pattern** e **Integration Layer** para desacoplamento e testabilidade.

- `src/app.module.ts`: Módulo raiz da aplicação.
- `src/modules/news/`: Módulo dedicado à entidade "News" (Notícias).
  - `dto/`: Data Transfer Objects para validação de entrada.
  - `entities/`: Definição da entidade e mapeamento para o banco de dados.
  - `interfaces/`: Contratos (interfaces) para os repositórios, garantindo inversão de dependência.
  - `repositories/`: Implementações concretas dos repositórios (ex: TypeORM).
  - `news.controller.ts`: Controladores que lidam com as requisições HTTP.
  - `news.service.ts`: Lógica de negócios, dependendo apenas da interface do repositório.
- `src/modules/cep/`: Módulo de domínio para consulta de endereços.
  - `cep.service.ts`: Regras de negócio para CEPs.
  - `cep.controller.ts`: Endpoints para consulta de CEP.
- `src/integrations/`: Camada de integração com serviços externos.
  - `viacep/`: Integração específica com a API ViaCEP.
    - `viacep.service.ts`: Encapsula a comunicação HTTP com o serviço externo.
    - `viacep.module.ts`: Módulo reutilizável de integração.
- `test/`: Testes e2e (End-to-End).

**Escalabilidade e Padrões (Senior Level)**:

- **Modularidade**: Novos módulos podem ser adicionados sem impacto lateral.
- **Repository Pattern**: A camada de serviço (`NewsService`) depende de uma abstração (`INewsRepository`) e não da implementação concreta (TypeORM).
- **Integration Layer**: A comunicação com APIs externas (ViaCEP) é isolada em `src/integrations`. O módulo de domínio `CepModule` consome o `ViaCepModule`, mantendo a lógica de negócio separada dos detalhes de implementação da requisição HTTP.
- **DTOs & Validação**: Centralização das regras de entrada de dados.
- **Docker**: Ambiente reproduzível e isolado.

## Pré-requisitos

- Docker e Docker Compose instalados.
- Node.js e NPM (opcional, para rodar localmente sem Docker).

## Como Executar

### Usando Docker (Recomendado)

1.  Certifique-se de que o Docker está rodando.
2.  Na raiz do projeto, execute:

    ```bash
    docker-compose up --build
    ```

3.  A API estará disponível em `http://localhost:3000`.
4.  A documentação Swagger estará disponível em `http://localhost:3000/api`.
5.  O Banco de Dados PostgreSQL estará rodando na porta `5432`.

### Rodando Localmente (Sem Docker para a API)

1.  Suba apenas o banco de dados com Docker:

    ```bash
    docker-compose up postgres -d
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Execute a aplicação:

    ```bash
    npm run start:dev
    ```

## Endpoints

### News (Notícias)

- **POST /news**: Cria uma nova notícia.
  - Body: `{ "title": "string", "description": "string" }`
- **GET /news**: Lista todas as notícias (com paginação e filtros).
- **GET /news/:id**: Busca uma notícia pelo ID.
- **PATCH /news/:id**: Atualiza uma notícia.
- **DELETE /news/:id**: Remove uma notícia (Soft Delete).

### CEP

- **GET /cep/:cep**: Consulta um endereço pelo CEP (integração com ViaCEP).

## Testes

Para rodar os testes automatizados (e2e):

1.  Certifique-se de que o banco de dados de teste está acessível (ou use o banco local rodando).
2.  Execute:

    ```bash
    npm run test:e2e
    ```

Os testes cobrem cenários de sucesso e falha na criação de notícias, garantindo a integridade da validação e do fluxo de dados.
