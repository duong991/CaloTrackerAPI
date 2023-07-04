import WaterLog from '../../models/WaterLog';
import { IWaterLog } from '../../interfaces/requests/user/water-log.interface';
interface IUserWaterLogService {
    getWaterLogByUserId: (userId: number) => Promise<WaterLog[] | null>;
    getWaterLogByDate: (
        userId: number,
        date: string,
    ) => Promise<WaterLog | null>;
    createWaterLog: (userId: number, data: IWaterLog) => Promise<WaterLog>;
    updateWaterLog: (
        userId: number,
        date: Date,
        amount: number,
    ) => Promise<WaterLog | null>;
}
const UserWaterLogService: IUserWaterLogService = {
    getWaterLogByUserId: async (userId: number): Promise<WaterLog[] | null> => {
        const waterLog = await WaterLog.findAll({
            where: { userId: userId },
        });
        return waterLog;
    },
    getWaterLogByDate: async (
        userId: number,
        date: string,
    ): Promise<WaterLog | null> => {
        const waterLog = await WaterLog.findOne({
            where: { userId: userId, date: date },
        });
        return waterLog;
    },

    createWaterLog: async (
        userId: number,
        data: IWaterLog,
    ): Promise<WaterLog> => {
        const isExist = await WaterLog.findOne({
            where: {
                userId: userId,
                date: data.date,
            },
        });
        if (isExist) {
            throw new Error('Water log already exists');
        } else {
            return await WaterLog.create({
                userId: userId,
                date: data.date,
                amount: data.amount,
            });
        }
    },

    updateWaterLog: async (userId: number, date: Date, amount: number) => {
        const convertDate = new Date(date);
        const waterLogToUpdate = await WaterLog.findOne({
            where: {
                userId: userId,
                date: convertDate,
            },
        });
        if (!waterLogToUpdate) {
            return null;
        }

        await waterLogToUpdate.update({
            amount: amount,
        });

        return waterLogToUpdate;
    },
};

export default UserWaterLogService;
