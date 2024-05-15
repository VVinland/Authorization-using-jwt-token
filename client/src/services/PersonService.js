import $api from "../http";

class PersonService {
    static async getAllPersons() {
        return await $api.get('/person/persons');
    }
}

export default PersonService;