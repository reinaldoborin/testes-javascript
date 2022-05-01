// Classe do usuário.
class User {
    constructor({id, name, profession, birthDay}){
        this.id = parseInt(id);
        this.name = name;
        this.profession = profession;
        this.birthDay = parseInt(birthDay);
    }
}

module.exports = User