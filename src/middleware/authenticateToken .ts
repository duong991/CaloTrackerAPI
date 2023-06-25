import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Token from '../models/Token';
import User from '../models/User';
import {
    createAccessToken,
    createRefreshToken,
} from '../utils/auth/generateToken';
import {
    UserPayload,
    RefreshTokenPayload,
} from '../interfaces/auth/TokenResponse';

const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log('Access token is missing');
        return res.status(401).json({ message: 'Access token is missing' });
    }

    try {
        // Xác minh tính hợp lệ của access token
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string,
        ) as UserPayload;
        const user = await User.findOne({ where: { id: decoded.id } });
        if (!user) {
            console.log('Invalid token');
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Lưu trữ thông tin user vào req để sử dụng trong các request khác
        req.user = user;
        req.accessToken = token;
        // Tiếp tục xử lý request
        next();
    } catch (err: any) {
        if (err && err.name === 'TokenExpiredError') {
            console.log(req);
            // Nếu access token hết hạn, sử dụng refresh token để tạo access token mới
            const refreshToken = req.headers['refresh-token'] as string;

            console.log('res.cookies', refreshToken);
            if (!refreshToken)
                return res.status(404).json({ message: 'Invalid token' });
            const tokenInDb = await Token.findOne({
                where: { refreshToken: refreshToken },
            });

            console.log('tokenInDb', tokenInDb);

            if (!tokenInDb) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            try {
                const decoded = jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET as string,
                ) as RefreshTokenPayload;

                const user = await User.findOne({
                    where: { id: decoded.id },
                });
                if (!user) {
                    return res.status(401).json({ message: 'Invalid token' });
                }

                // Tạo access token mới và lưu trữ nó vào cơ sở dữ liệu
                const accessToken = createAccessToken(
                    user.id,
                    user.username,
                    user.role,
                );
                tokenInDb.accessToken = accessToken;
                await tokenInDb.save();

                // Lưu trữ thông tin user vào req để sử dụng trong các request khác
                req.user = user;

                req.accessToken = accessToken;

                // Tiếp tục xử lý request
                next();
            } catch (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
        } else {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
};
export default authenticateToken;
