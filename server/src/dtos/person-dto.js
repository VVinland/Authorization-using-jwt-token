class PersonDto {
    id;
    login;

    constructor(model) {
        this.id = model.id;
        this.login = model.login;
    }
}

export default PersonDto;