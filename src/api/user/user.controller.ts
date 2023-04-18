import { Request, Response } from 'express';
import UserService from './user.service';
import UpdateInfoUserRequest from '../../interfaces/UpdateInfoUserRequest';
export default class UserController {
    public async getUserInfo(req: Request, res: Response): Promise<Response> {
        const userId = +req.params.userId;
        const user = req.user;
        try {
            const userInfo = await UserService.getUserInfo(userId);

            if (!userInfo) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(userInfo);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    public async updateUserInfo(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const userId = +req.params.userId;
        const { weight, height, activityLevel }: UpdateInfoUserRequest =
            req.body;
        try {
            const updatedUserInfo = await UserService.updateUserInfo(userId, {
                weight,
                height,
                activityLevel,
            });
            return res.status(200).json(updatedUserInfo);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
