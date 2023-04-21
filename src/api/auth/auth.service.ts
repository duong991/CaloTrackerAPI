import User from '../../models/User';
import Token from '../../models/Token';
import bcrypt from 'bcryptjs';
import {
    createAccessToken,
    createRefreshToken,
} from '../../utils/auth/generateToken';
interface AuthService {
    register: (username: string, password: string) => Promise<User | boolean>;
    login: (username: string, password: string) => Promise<object>;
}

const AuthService: AuthService = {
    register: async (
        username: string,
        password: string,
    ): Promise<User | boolean> => {
        const user: User | null = await User.findOne({
            where: { username: username },
        });
        if (user) {
            return false;
        }
        const newUser = await User.create({
            username: username,
            password: password,
            role: false,
        });
        return newUser;
    },
    login: async (username: string, password: string): Promise<object> => {
        const user: User | null = await User.findOne({
            where: { username: username },
            raw: true,
        });
        if (!user) {
            throw new Error('Tên người dùng hoặc mật khẩu không hợp lệ');
        }

        const isPasswordValid: boolean = await bcrypt.compare(
            password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new Error('Tên người dùng hoặc mật khẩu không hợp lệ');
        }

        const accessToken: string = createAccessToken(
            user.id,
            user.username,
            user.role,
        );
        const refreshToken: string = createRefreshToken(user.id);
        await Token.create({
            userId: user.id,
            accessToken: accessToken,
            refreshToken: refreshToken,
            expires: new Date(),
        });
        return { accessToken, refreshToken };
    },
};

export default AuthService;
