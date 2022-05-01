const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
    // Abertura de brackets para escopo e reutilização de nome de váriaveis.
    {
        // Arquivo vazio, o teste espera que tenha campos.
        const path = './mocks/emptyFile.csv';
        const rejection = new Error(error.FILE_FIELD_ERROR_MESSAGE);
        const result = File.csvToJson(path)
        await rejects(result, rejection)
    }
    {
        // Arquivo com 4 itens, o teste espera que tenha no máximo 3 itens.
        const path = './mocks/fourItems.csv';
        const rejection = new Error(error.FILE_SIZE_ERROR_MESSAGE);
        const result = File.csvToJson(path)
        await rejects(result, rejection)
    }
    {
        // Arquivo com 3 itens, o teste espera que tenha no máximo 3 itens.
        const path = './mocks/threeItems.csv';
        const result = await File.csvToJson(path);

        // Objeto que é esperado após a leitura e conversão do CSV para JSON.
        const expected = [
            {
                "id": 1,
                "name": "Reinaldo Borin",
                "profession": "Desenvolvedor",
                "birthDay": 1985
            },
            {
                "id": 2,
                "name": "Luana Couto",
                "profession": "Assistente Comercial",
                "birthDay": 1989
            },
            {
                "id": 3,
                "name": "Artur Alves",
                "profession": "Farmacêutico",
                "birthDay": 1950
            }
        ];

        // Método que compara o resultado e o esperado.
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
    }
})()
