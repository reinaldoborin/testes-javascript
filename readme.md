# Testes em Node.JS

Métodos de testes em Node.JS.

- [1] Mocks.
Verificação interna de comportamento, utilizando objetos estáticos.
- [2] Stubs (Sinon).
Substituem comportamentos no sistema por objetos estáticos, onde também se cria diferentes mocks para diferente cenários.
- [3] Spies (Sinon).
Observa a função, validando a quantidade de vezes que elas foram chamadas, com quais paramêtros e quais resultados elas retornaram.
Útil para funções recursivas ou que dependem de uma lógica complexa para um termo de parada.