# dock-backend-test

## Índice

  - [🔖&nbsp; Sobre](#-sobre)
  - [🗂 Como executar](#-como-executar)
  - [Documentação da API](#documentação-da-api)
  - [Escopo mínimo](#escopo-mínimo)
  - [Diferencial](#diferencial)
  - [Outras melhorias](#outras-melhorias)

---
### 🔖&nbsp; Sobre

Teste técnico para desenvolvedor back end na [Dock](https://dock.tech/)

---

### 🗂 Como executar

```bash

    # Clone o repositório
    $ git clone https://github.com/Edmoita/dock-backend-test

    # Entre no diretório
    $ cd dock-backend-test

    # Crie uma cópia do arquivo de configuração do docker
    $ cp docker-compose.yml.example docker-compose.yml

    # Crie uma cópia do arquivo com as variáveis de ambiente
    $ cp .env.example .env

    # Instale as dependências
    $ yarn install

    # Inicie e execute o aplicativo
    $ docker-compose up

    # Execute o script para criação de um usuário
    $ docker exec dock_test_api node ./dist/scripts/createUser.js

    # Para executar os testes, faça
    $ docker exec dock_test_api yarn test
```
---
### Documentação da API
Acesse a documentação da API no formato OpenAPI 2 (Swagger) em [http://localhost:3333/docs](http://localhost:3333/docs)

---

### Escopo mínimo
- [X] Implementar path que realiza a criação de uma conta;
  - [X] Deve ser possível criar uma conta com idPessoa, limiteSaqueDiario e tipoConta;
  - [X] O saldo deve ter o valor default 0;
  - [X] A conta será criada bloqueada com valor flagAtivo como verdadeiro;
  - [X] O campo dataCriacao será determinado no momento da inserção no banco de dados.
- [X] Implementar path que realiza operação de depósito em uma conta;
  - [X] Deve ser possível criar uma transação de depósito com idConta e valor;
  - [X] A conta deve estar ativa;
  - [X] Deve ser criada uma transação de depósito com esse valor;
  - [X] A conta deve ter seu saldo atualizado com o novo valor.
- [X] Implementar path que realiza operação de consulta de saldo em determinada conta;
  - [X] Deve ser possível consultar o saldo de uma conta com idConta;
  - [X] A conta deve estar ativa.
- [X] Implementar path que realiza operação de saque em uma conta;
  - [X] Deve ser possível criar uma transação de saque com idConta e valor;
  - [X] A conta deve estar ativa;
  - [X] O valor do saque não pode ser maior do que o saldo da conta;
  - [X] O valor do saque não pode ser maior do que o limiteSaqueDiario quando somado com os outros saques do dia;
  - [X] A conta deve ter seu saldo atualizado com o novo valor;
- [X] Implementar path que realiza o bloqueio de uma conta;
  - [X] Deve ser possível bloquear uma conta com idConta;
- [X] Implementar path que recupera o extrato de transações de uma conta;
  - [X] Deve ser possível listar as transações de uma conta;
  - [X] A conta deve estar ativa;
  - [X] As transações devem retornar em ordem decrescente de dataTransacao.
- [X] Script para criação de pelo menos uma pessoa.
---
### Diferencial
- [X] Implementar extrato por período;
  - [X] Deve ser possível listar as transações com um intervalo de tempo;
  - [X] As transações devem retornar em ordem decrescente de dataTransacao.
- [X] Elaborar manual de execução;
  - [X] Fazer uma seção neste README como executar o projeto;
  - [X] Criar Dockerfile e docker-compose.
- [X] Elaborar documentação;
  - [X] Deve ser escrita na especificação OpenApi (Swagger);
  - [X] Deve estar disponível na aplicação como um endpoint.
- [X] Elaborar testes;
  - [X] Devem testar os requisitos e regras de negócio citados em Escopo mínimo;
  - [X] Deve ser gerado um coverage report.
---
### Outras melhorias
- [ ] Implementação de pontos de falha e resiliência;
  - [ ] Deve ser implementado um middleware de validação de dados de requisição;
  - [X] Deve ser implementado um middleware de tratamento de erros;
- [ ] Elaborar desenho da arquitetura do projeto.
  - [ ] O arquivo com o desenho deve ficar disponível no repositório.

