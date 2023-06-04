import User from '../../models/User';
import Token from '../../models/Token';
import bcrypt from 'bcryptjs';
import {
    createAccessToken,
    createRefreshToken,
} from '../../utils/auth/generateToken';
import ILoginResponse from '../../interfaces/requests/auth/login.interface';
interface AuthService {
    register: (username: string, password: string) => Promise<boolean>;
    login: (username: string, password: string) => Promise<ILoginResponse>;
}

const saltRounds = 10;

const AuthService: AuthService = {
    login: async (
        username: string,
        password: string,
    ): Promise<ILoginResponse> => {
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
    register: async (username: string, password: string): Promise<boolean> => {
        const user: User | null = await User.findOne({
            where: { username: username },
        });
        if (user) {
            return false;
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.create({
            username: username,
            password: hashedPassword,
            role: false,
        });
        // AuthService.login(username, password);
        return true;
    },
};

export default AuthService;
