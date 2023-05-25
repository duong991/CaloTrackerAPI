import WaterLog from '../../models/WaterLog';
import { IWaterLog } from '../../interfaces/requests/user/water-log.interface';
interface IUserWaterLogService {
    getWaterLogByUserId: (userId: number) => Promise<WaterLog[] | null>;
    getWaterLogByDate: (
        userId: number,
        date: string,
    ) => Promise<WaterLog | null>;
    createWaterLog: (
        userId: number,
        data: IWaterLog,
    ) => Promise<WaterLog | Error>;
    updateWaterLog: (
        waterLogId: number,
        data: IWaterLog,
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
    ): Promise<WaterLog | Error> => {
        const isExist = await WaterLog.findOne({
            where: { userId: userId, date: data.date },
        });
        if (isExist) {
            throw new Error('Water log already exist');
        }
        return await WaterLog.create({
            userId: userId,
            date: data.date,
            amount: data.amount,
        });
    },

    updateWaterLog: async (waterLogId: number, data: IWaterLog) => {
        const waterLogToUpdate = await WaterLog.findByPk(waterLogId);

        if (!waterLogToUpdate) {
            return null;
        }

        await waterLogToUpdate.update({
            date: data.date,
            amount: data.amount,
        });

        return waterLogToUpdate;
    },
};

export default UserWaterLogService;
