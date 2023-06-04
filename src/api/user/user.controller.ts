import { Request, Response } from 'express';
import UserService from './user.service';
import { IUpdateInfoUserRequest } from '../../interfaces/requests/user/user-info.interface';
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
                return res.status(200).json({ userInfo });
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async createUserInfo(
        req: Request,
        res: Response,
    ): Promise<Response> {
        console.log(req.body);
        const user = req.user;
        try {
            if (user != undefined) {
                const userInfo = await UserService.getUserInfo(user.id);
                if (userInfo) {
                    return res.status(400).json({
                        message: 'User info already exists',
                    });
                }
                await UserService.createUserInfo(
                    user.id,
                    req.body as IUpdateInfoUserRequest,
                );
                return res
                    .status(201)
                    .json({ message: 'Create user info successfully' });
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
        const userId = req.user.id;

        const {
            weight,
            height,
            activityLevel,
            target,
            lastTimeToUpdate,
            gender,
            protein,
            fat,
            carb,
        }: IUpdateInfoUserRequest = req.body;
        try {
            const updatedUserInfo = await UserService.updateUserInfo(userId, {
                weight,
                height,
                activityLevel,
                target,
                gender,
                lastTimeToUpdate,
                protein,
                fat,
                carb,
            });
            if (updatedUserInfo === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res
                .status(200)
                .json({ message: 'Update user info successfully' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
