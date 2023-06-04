import { sequelize } from '../../config/connectDB';
import { Transaction } from 'sequelize';

import UserInfo from '../../models/UserInfo';
import UserWeightHistory from '../../models/UserWeightHistory';
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
                'userId',
                'weight',
                'activityLevel',
                'height',
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
        const t: Transaction = await sequelize.transaction();

        try {
            const newUserInfo = await UserInfo.create(
                {
                    userId: userId,
                    weight: userInfo.weight,
                    height: userInfo.height,
                    gender: userInfo.gender,
                    activityLevel: userInfo.activityLevel,
                    target: userInfo.target,
                    lastTimeToUpdate: userInfo.lastTimeToUpdate,
                    protein: userInfo.protein,
                    fat: userInfo.fat,
                    carb: userInfo.carb,
                },
                { transaction: t },
            );

            await UserWeightHistory.create(
                {
                    userId: userId,
                    weight: userInfo.weight,
                    date: userInfo.lastTimeToUpdate, // Thay đổi theo ngày tạo mới
                },
                { transaction: t },
            );

            await t.commit();
            return newUserInfo;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    },

    async updateUserInfo(
        userId: number,
        userInfo: IUpdateInfoUserRequest,
    ): Promise<number> {
        const t: Transaction = await sequelize.transaction();

        try {
            const [updatedRows] = await UserInfo.update(userInfo, {
                where: { userId: userId },
                returning: true,
                transaction: t,
            });

            if (updatedRows === 0) {
                await t.rollback();
                throw new Error('User not found');
            }

            const isExistWeightLog = await UserWeightHistory.findOne({
                where: { userId: userId, date: userInfo.lastTimeToUpdate },
            });
            if (isExistWeightLog) {
                await UserWeightHistory.update(
                    {
                        weight: userInfo.weight,
                    },
                    {
                        where: {
                            userId: userId,
                            date: userInfo.lastTimeToUpdate,
                        },
                        transaction: t,
                    },
                );
            } else {
                await UserWeightHistory.create(
                    {
                        userId: userId,
                        weight: userInfo.weight,
                        date: userInfo.lastTimeToUpdate,
                    },
                    { transaction: t },
                );
            }
            await t.commit();
            return updatedRows;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    },
};

export default UserService;
