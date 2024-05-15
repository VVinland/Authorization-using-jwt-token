import $api from "../http";

class AuthService {
    static async registration(login, password) {
        return await $api.post('/person/registration', {
            login, password
        });
    }
    static async login(login, password) {
        return await $api.post('/person/login', {
            login, password
        });
    }
    static async logout() {
        return await $api.get('/person/logout');
    }
}


export default AuthService;