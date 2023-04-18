import User from '../../models/User';
import UserInfo from '../../models/UserInfo';
import UpdateInfoUserRequest from '../../interfaces/UpdateInfoUserRequest';

interface UserService {
    getUserInfo: (userId: number) => Promise<UserInfo | null>;
    updateUserInfo: (
        userId: number,
        userInfo: UpdateInfoUserRequest,
    ) => Promise<any>;
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
            ],
        });
        return userInfo;
    },
    async updateUserInfo(userId: number, userInfo: UpdateInfoUserRequest) {
        const [updatedRows] = await UserInfo.update(userInfo, {
            where: { userId: userId },
            returning: true,
        });

        if (updatedRows === 0) {
            throw new Error('User not found');
        }

        const updatedUserInfo = await UserInfo.findOne({
            where: { id: userId },
            attributes: [
                'id',
                'weight',
                'height',
                'activityLevel',
                'otherInfo',
            ],
        });

        return updatedUserInfo;
    },
};

export default UserService;
