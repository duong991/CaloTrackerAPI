import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const createAccessToken = (
    id: number,
    username: string,
    role: boolean,
) => {
    const accessToken = jwt.sign(
        { id: id, userName: username, role: role },
        process.env.ACCESS_TOKEN_SECRET || 'default-secret-key',
        {
            expiresIn: '7d',
        },
    );
    return accessToken;
};

export const createRefreshToken = (userId: number) => {
    const refreshToken = jwt.sign(
        { id: userId },
        process.env.REFRESH_TOKEN_SECRET || 'default-secret-key-refresh',
        {
            expiresIn: '7d',
        },
    );
    return refreshToken;
};
