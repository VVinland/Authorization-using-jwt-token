import { action, computed, makeObservable, observable } from 'mobx';
import AuthService from '../services/AuthService.js';
import axios from 'axios';
import { API_URL } from '../http/index.js';

class PersonStore {
    personData = {};
    isAuth = false;
    isLoading = false;

    constructor() {
        makeObservable(this,
            {
                personData: observable,
                isAuth: observable,
                isLoading: observable,
                getIsLoading: computed,
                getPerson: computed,
                getIsAuth: computed,
                setPerson: action,
                setIsAuth: action,
                setIsLoading: action
            }
        )
    }

    get getPerson() {
        return this.personData;
    }

    get getIsAuth() {
        return this.isAuth;
    }

    get getIsLoading() {
        return this.isLoading;
    }

    setPerson(personData) {
        this.personData = personData;
    }

    setIsAuth(isAuth) {
        this.isAuth = isAuth;
    }

    setIsLoading(isLoading) {
        this.isLoading = isLoading;
    }

    async registration(login, password) {
        try {
            const response = await AuthService.registration(login, password);
            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setPerson(response.data.person);
            this.setIsAuth(true);
        } catch (error) {
            console.error(error);
        }
    }

    async login(login, password) {
        try {
            const response = await AuthService.login(login, password);
            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setPerson(response.data.person);
            this.setIsAuth(true);
        } catch (error) {
            console.error(error);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('accessToken');
            this.setPerson({});
            this.setIsAuth(false);
        } catch (error) {
            console.error(error);
        }
    }

    async checkIsAuth() {
        this.setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/person/refresh`, { withCredentials: true });
            console.log(response);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setPerson(response.data.person);
            this.setIsAuth(true);
        } catch (error) {
            console.error(error);
        }
        finally {
            this.setIsLoading(false);
        }
    }
}

export default PersonStore;