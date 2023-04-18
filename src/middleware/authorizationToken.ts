import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/auth/verifyToken ';
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }
    const decodedToken = verifyAccessToken(token);
    if (!decodedToken) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    const isAdmin = decodedToken.role;

    if (isAdmin) {
        next(); // Cho phép truy cập
    } else {
        res.status(403).send('Bạn không có quyền truy cập chức năng này');
    }
};
