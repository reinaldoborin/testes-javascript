class Fibonacci {
    // Generator, funções de interação.
    *execute (input, current = 0, next = 1){
        if(input === 0){
            return 0;
        }
        // Yield age como um return dentro de um generator.
        // Retorna o valor.
        yield current
        // Delega a função, mas não retorna o valor.
        yield* this.execute(input -1, next, current + next)
    }
}

module.exports = Fibonacci