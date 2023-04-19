import { Request, Response } from 'express';
import UserService from './user.service';
import UpdateInfoUserRequest from '../../interfaces/UpdateInfoUserRequest';
export default class UserController {
    public async getUserInfo(req: Request, res: Response): Promise<Response> {
        const user = req.user;
        try {
            if (user != undefined) {
                const userInfo = await UserService.getUserInfo(user.id);
                if (!userInfo) {
                    return res
                        .status(404)
                        .json({ message: 'User info not found' });
                }
                return res.status(200).json(userInfo);
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    public async updateUserInfo(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const user = req.user;

        const { weight, height, activityLevel }: UpdateInfoUserRequest =
            req.body;
        try {
            if (user != undefined) {
                const updatedUserInfo = await UserService.updateUserInfo(
                    user.id,
                    {
                        weight,
                        height,
                        activityLevel,
                    },
                );
                return res.status(200).json(updatedUserInfo);
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
