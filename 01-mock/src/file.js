const { readFile} = require('fs/promises');
const { error } = require('./constants');
const User = require('./user');

// Opções padrões do objeto.
const DEFAULT_OPTION = {
    max_lines: 3,
    fields: ["id", "name", "profession", "birthDay"]
};

// Classe do Arquivo.
class File {
    // Converte um arquivo CSV para JSON.
    static async csvToJson(filePath) {
        const content = await File.readFileContent(filePath);
        const validation = File.isValid(content);
        if(!validation.valid) 
            throw new Error(validation.error)

        const users = File.parseCsvToJson(content)
        return users;
    }

    // Realiza a leitura do conteúdo de um arquivo.
    static async readFileContent(filePath) {
        return (await readFile(filePath)).toString("utf8")
    }

    // Verifica se o arquivo é válido.
    static isValid(csvString, options = DEFAULT_OPTION) {
        const [header, ...fileWithoutHeader] = csvString.split('\r'); // Ambiente Linux usar \n.
        
        // Verifica se a Header é válida.
        const isValidHeader = header === options.fields.join(',');
        if(!isValidHeader) {
            return {
                error: error.FILE_FIELD_ERROR_MESSAGE
            }
        }

        // Verifica se o conteúdo é válido.
        const isValidContent = (
            fileWithoutHeader.length > 0 && fileWithoutHeader.length <= options.max_lines
        )
        if(!isValidContent) {
            return {
                error: error.FILE_SIZE_ERROR_MESSAGE
            }
        }

        return { valid: true };
    };

    // Realiza a leitura do arquivo CSV e converte para um objeto de usuários.
    static parseCsvToJson(csvString) {
        const lines = csvString.split('\r') // Ambiente Linux usar \n.
        const firstLine = lines.shift()
        const header = firstLine.split(',')
        const users = lines.map(line => {
            const columns = line.split(',')
            let user = {}
            for(const index in columns)
            user[header[index]] = columns[index]
            return new User(user)
        })
        return users
    }
};

module.exports = File;