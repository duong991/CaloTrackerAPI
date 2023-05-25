import UserWeightHistory from '../../models/UserWeightHistory';
interface IUserWeightHistoryService {
    getUserWeightHistoryByUserId: (
        userId: number,
    ) => Promise<UserWeightHistory[] | null>;
    getUserWeightHistoryByDate: (
        userId: number,
        date: Date,
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
    ): Promise<UserWeightHistory[] | null> => {
        const weightLogs = await UserWeightHistory.findAll({
            where: { userId: userId },
        });
        return weightLogs;
    },
    getUserWeightHistoryByDate: async (
        userId: number,
        date: Date,
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
            return null;
        }

        await weightLog.update({
            weight: weight,
        });

        return weightLog;
    },
};

export default userWeightHistoryService;
