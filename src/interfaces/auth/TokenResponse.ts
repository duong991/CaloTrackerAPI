import User from '../../models/User';
interface UserPayload {
    id: number;
    userName: string;
    role: boolean;
}
interface RefreshTokenPayload {
    id: number;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user: User;
            accessToken: string;
        }
    }
}

export { UserPayload, RefreshTokenPayload };
