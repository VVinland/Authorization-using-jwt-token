import tokenService from "../services/token-service.js";

function authMiddleware(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) throw new Error('Отсутствует заголовок "authorization"');

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) throw new Error('Нет accessToken');

        const personData = tokenService.validateAccessToken(accessToken);
        if (!personData) throw new Error('Ошибка валидации accessToken');

        req.person = personData;
        next();
    } catch (error) {
        next(new Error(`${error.message}`));
    }
}

export default authMiddleware;