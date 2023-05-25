import UserInfo from '../../models/UserInfo';
import { IUpdateInfoUserRequest } from '../../interfaces/requests/user/user-info.interface';

interface UserService {
    getUserInfo: (userId: number) => Promise<UserInfo | null>;
    createUserInfo: (
        userId: number,
        userInfo: IUpdateInfoUserRequest,
    ) => Promise<UserInfo>;
    updateUserInfo: (
        userId: number,
        userInfo: IUpdateInfoUserRequest,
    ) => Promise<number>;
}

const UserService: UserService = {
    getUserInfo: async (userId: number): Promise<UserInfo | null> => {
        const userInfo: UserInfo | null = await UserInfo.findOne({
            where: { userId: userId },
            attributes: [
                'id',
                'userId',
                'weight',
                'activityLevel',
                'height',
                'BMR',
                'target',
                'lastTimeToUpdate',
                'protein',
                'fat',
                'carb',
            ],
        });
        return userInfo;
    },
    async createUserInfo(
        userId: number,
        userInfo: IUpdateInfoUserRequest,
    ): Promise<UserInfo> {
        const newUserInfo = await UserInfo.create({
            userId: userId,
            weight: userInfo.weight,
            height: userInfo.height,
            gender: userInfo.gender,
            activityLevel: userInfo.activityLevel,
            BMR: userInfo.BMR,
            target: userInfo.target,
            lastTimeToUpdate: userInfo.lastTimeToUpdate,
            protein: userInfo.protein,
            fat: userInfo.fat,
            carb: userInfo.carb,
        });
        return newUserInfo;
    },

    async updateUserInfo(
        userId: number,
        userInfo: IUpdateInfoUserRequest,
    ): Promise<number> {
        const [updatedRows] = await UserInfo.update(userInfo, {
            where: { userId: userId },
            returning: true,
        });

        if (updatedRows === 0) {
            throw new Error('User not found');
        }

        return updatedRows;
    },
};

export default UserService;
