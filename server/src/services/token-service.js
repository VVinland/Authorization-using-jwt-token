import jsonwebtoken from 'jsonwebtoken';
import db from './../db.js';

class TokenService {

    generateTokens(payload) {
        const accessToken = jsonwebtoken.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15s' })
        const refreshToken = jsonwebtoken.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30s' })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(accessToken) {
        try {
            const payload = jsonwebtoken.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            return payload;
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            const payload = jsonwebtoken.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            return payload;
        } catch (error) {
            return null
        }
    }

    async saveRefreshToken(personId, refreshToken) {
        const tokenData = await db.query(`SELECT * FROM token where personId='${personId}';`)
        if (tokenData.rows.length !== 0) {
            const token = await db.query(`UPDATE token SET refreshToken='${refreshToken}' WHERE personId='${personId}';`);
            return token;
        }

        const token = await db.query(`INSERT INTO token(refreshToken, personId) VALUES ('${refreshToken}', '${personId}');`);
        return token;
    }

    async removeRefreshToken(refreshToken) {
        const token = await db.query(`DELETE FROM token WHERE refreshToken = '${refreshToken}';`)
        return token
    }

    async findRefreshToken(refreshToken) {
        const tokenData = await db.query(`SELECT * FROM token WHERE refreshToken='${refreshToken}';`)
        if (tokenData.rows.length === 0) return null;

        return tokenData.rows[0];
    }
}

export default new TokenService();