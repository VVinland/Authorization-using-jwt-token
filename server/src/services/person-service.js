import bcrypt from 'bcrypt';
import db from './../db.js'
import tokenService from './token-service.js';
import PersonDto from '../dtos/person-dto.js';

class PersonServices {
    async registration(login, password) {
        const candidate = await db.query(`SELECT * FROM person WHERE login='${login}';`);

        if (candidate.rows.length !== 0) {
            throw new Error(`Пользователь с таким login = ${login} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const person = await db.query(`INSERT INTO person (login, password) VALUES ('${login}', '${hashPassword}') RETURNING *;`);

        const personDto = new PersonDto(person.rows[0]);
        const tokens = tokenService.generateTokens({ ...personDto });
        await tokenService.saveRefreshToken(personDto.id, tokens.refreshToken);
        return {
            ...tokens,
            person: { ...personDto }
        }
    }

    async login(login, password) {
        const person = await db.query(`SELECT * FROM person WHERE login='${login}';`);

        if (person.rows.length === 0) {
            throw new Error(`Такой пользователь ${login} не зарегистрирован`);
        }

        const isPassEquals = await bcrypt.compare(password, person.rows[0].password);

        if (!isPassEquals) {
            throw new Error(`Пароль неверный`);
        }

        const personDto = new PersonDto(person.rows[0]);
        const tokens = tokenService.generateTokens({ ...personDto });
        await tokenService.saveRefreshToken(personDto.id, tokens.refreshToken);
        return {
            ...tokens,
            person: { ...personDto }
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeRefreshToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw new Error('Рефреш токен пустой');

        const personData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findRefreshToken(refreshToken);

        if (!personData || !tokenFromDb) throw new Error('Проблема с рефрештокеном');

        const person = await db.query(`SELECT * FROM person WHERE id='${personData.id}';`);
        const personDto = new PersonDto(person.rows[0]);
        const tokens = tokenService.generateTokens({ ...personDto });
        await tokenService.saveRefreshToken(personDto.id, tokens.refreshToken);
        return {
            ...tokens,
            person: personDto
        }
    }

    async getPersons() {
        const persons = await db.query(`SELECT * FROM person;`);

        if (persons.rows.length !== 0) return persons.rows;

        return [];
    }
}

export default new PersonServices();