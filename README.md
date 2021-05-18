# dock-backend-test
Technical test for back end developer at Dock


## Requisitos
- Node.js (14.17.0)
- Yarn (1.22.5)

## Escopo mínimo
- [X] Implementar path que realiza a criação de uma conta;
  - [X] Deve ser possível criar uma conta com idPessoa, limiteSaqueDiario e tipoConta;
  - [X] O saldo deve ter o valor default 0;
  - [X] A conta será criada bloqueada com valor flagAtivo como falso;
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
  - [ ] As transações devem retornar em ordem crescente de dataTransacao.
- [X] Script para criação de pelo menos uma pessoa.

## Diferencial
- [ ] Implementar extrato por período;
  - [ ] Deve ser possível listar as transações com mês e ano;
  - [ ] As transações devem retornar em ordem crescente de dataTransacao.
- [ ] Elaborar manual de execução;
  - [ ] Criar Dockerfile ou docker-compose
- [ ] Elaborar documentação;
  - [ ] Deve ser escrita na especificação OpenApi;
  - [ ] Deve estar disponível na aplicação como um endpoint.
- [ ] Elaborar testes;
  - [ ] Devem testar os requisitos e regras de negócio citados em Escopo mínimo;
  - [ ] Deve ser gerado um coverage report.
