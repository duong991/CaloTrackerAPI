import { Request, Response } from 'express';
import AuthService from './auth.service';
export default class AuthController {
    public async register(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Email and password are required' });
        }

        try {
            const isCreate = await AuthService.register(email, password);
            if (!isCreate) {
                return res
                    .status(400)
                    .json({ message: 'Email already exists' });
            }
            return res.status(201).json({ message: 'Create success' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ message: 'Username and password are required' });
            }
            const { accessToken, refreshToken } = await AuthService.login(
                email,
                password,
            );
            return res
                .status(200)
                .json({ accessToken: accessToken, refreshToken: refreshToken });
        } catch (error: any) {
            console.error(error);
            if (error.message === 'Tên người dùng hoặc mật khẩu không hợp lệ') {
                return res.status(403).json({ message: error.message });
            } else {
                return res.status(500).json({ message: 'Server error' });
            }
        }
    }
}
