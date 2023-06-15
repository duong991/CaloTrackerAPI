import UserWeightHistory from '../../models/UserWeightHistory';

type UserWeightHistoryResponse = {
    date: Date;
    id?: number | undefined;
    userId: number;
    weight: number;
};
interface IUserWeightHistoryService {
    getUserWeightHistoryByUserId: (
        userId: number,
    ) => Promise<UserWeightHistoryResponse[] | null>;
    getUserWeightHistoryByDate: (
        userId: number,
        date: string,
    ) => Promise<UserWeightHistory | null>;
    createUserWeightHistory: (
        userId: number,
        date: Date,
        amount: number,
    ) => Promise<UserWeightHistory>;
    updateUserWeightHistory: (
        userId: number,
        date: Date,
        amount: number,
    ) => Promise<UserWeightHistory | null>;
}
const userWeightHistoryService: IUserWeightHistoryService = {
    getUserWeightHistoryByUserId: async (
        userId: number,
    ): Promise<UserWeightHistoryResponse[] | null> => {
        const weightLogs = await UserWeightHistory.findAll({
            where: { userId: userId },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            raw: true,
        });
        if (!weightLogs) {
            return null;
        }
        // const transformedWeightLogs = weightLogs.map((log) => ({
        //     ...log.toJSON(),
        //     date: new Date(log.date), // Chuyển đổi trường date thành kiểu Date
        // }));

        // return transformedWeightLogs;
        return weightLogs;
    },
    getUserWeightHistoryByDate: async (
        userId: number,
        date: string,
    ): Promise<UserWeightHistory | null> => {
        const weightLog = await UserWeightHistory.findOne({
            where: { userId: userId, date: date },
        });
        return weightLog;
    },

    createUserWeightHistory: async (
        userId: number,
        date: Date,
        weight: number,
    ) => {
        const isExist = await UserWeightHistory.findOne({
            where: { userId: userId, date: date },
        });
        if (isExist) {
            throw new Error('Weight log already exists');
        }
        return await UserWeightHistory.create({
            userId: userId,
            date: date,
            weight: weight,
        });
    },

    updateUserWeightHistory: async (
        userId: number,
        date: Date,
        weight: number,
    ) => {
        const weightLog = await UserWeightHistory.findOne({
            where: { userId: userId, date: date },
        });

        if (!weightLog) {
            throw new Error('Weight log not found');
        }

        await weightLog.update({
            weight: weight,
        });

        return weightLog;
    },
};

export default userWeightHistoryService;
