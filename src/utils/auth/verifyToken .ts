import jwt from 'jsonwebtoken';
import {
    UserPayload,
    RefreshTokenPayload,
} from '../../interfaces/auth/TokenResponse';
import dotenv from 'dotenv';
dotenv.config();

export const verifyAccessToken = (token: string): UserPayload | null => {
    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string,
        );
        // eslint-disable-next-line no-prototype-builtins
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
            return decoded as UserPayload;
        }
        return null;
    } catch (err) {
        return null;
    }
};

export const verifyRefreshToken = (
    token: string,
): RefreshTokenPayload | null => {
    try {
        const decoded = jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET as string,
        );
        // eslint-disable-next-line no-prototype-builtins
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
            return decoded as UserPayload;
        }
        return null;
    } catch (err) {
        return null;
    }
};
