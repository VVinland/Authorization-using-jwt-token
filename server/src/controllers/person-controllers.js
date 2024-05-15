import personService from "../services/person-service.js";

class UserController {
    async registration(request, response, next) {
        try {
            const { login, password } = request.body;
            const personData = await personService.registration(login, password);
            response.cookie('refreshCookie', personData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return response.json(personData);
        } catch (error) {
            response.status(400).json({ message: error.message });
        }
    }


    async login(request, response, next) {
        try {
            const { login, password } = request.body;
            const personData = await personService.login(login, password);
            response.cookie('refreshToken', personData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return response.json(personData);
        } catch (error) {
            response.status(400).json({ message: error.message });
        }
    }

    async logout(request, response, next) {
        try {
            const { refreshToken } = request.cookies;
            const token = await personService.logout(refreshToken);
            response.clearCookie('refreshToken');
            return response.json(token);
        } catch (error) {
            response.status(400).json({ message: error.message });
        }
    }

    async refresh(request, response, next) {
        try {
            const {refreshToken} = request.cookies;
            const personData = await personService.refresh(refreshToken);
            response.cookie('refreshToken', personData.refreshToken, {maxAge:30*24*60*60*1000, httpOnly:true});
            return response.json(personData);
        } catch (error) {
            response.status(400).json({ message: error.message });
        }
    }

    async getAllPersons(request, response, next) {
        try {
            const persons = await personService.getPersons();
            return response.json(persons);
        } catch (error) {
            response.status(400).json({ message: error.message });
        }
    }
}


export default new UserController();