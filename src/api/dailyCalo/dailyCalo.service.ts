import DailyCalo from '../../models/DailyCalo';
import { IDataRequestDailyCalo } from '../../interfaces/requests/user/daily-calo.interface';
interface IDailyCaloService {
    getAll: (userId: number) => Promise<DailyCalo[] | null>;
    getByDate: (userId: number, date: string) => Promise<DailyCalo | null>;
    create: (
        userId: number,
        data: IDataRequestDailyCalo,
    ) => Promise<DailyCalo | Error>;
    update: (
        id: number,
        req: IDataRequestDailyCalo,
    ) => Promise<DailyCalo | null>;
    delete: (userId: number, date: string) => Promise<boolean>;
}
const DailyCaloService: IDailyCaloService = {
    getAll: async (userId: number): Promise<DailyCalo[] | null> => {
        const dailyCalos = await DailyCalo.findAll({
            where: { userId: userId },
        });
        return dailyCalos;
    },

    getByDate: async (
        userId: number,
        date: string,
    ): Promise<DailyCalo | null> => {
        const dailyCalo = await DailyCalo.findOne({
            where: { userId: userId, date: date },
        });
        return dailyCalo;
    },

    create: async (
        userId: number,
        data: IDataRequestDailyCalo,
    ): Promise<DailyCalo | Error> => {
        const { caloriesConsumed, caloriesIntake, date } = data;
        const isExist = await DailyCalo.findOne({
            where: {
                userId: userId,
                date: date,
            },
        });
        if (isExist) {
            throw new Error('DailyCalo already exists');
        }
        return await DailyCalo.create({
            userId: userId,
            caloriesIntake: caloriesIntake,
            caloriesConsumed: caloriesConsumed,
            date: date,
        });
    },

    update: async (userId: number, req: IDataRequestDailyCalo) => {
        const { date, caloriesIntake, caloriesConsumed } = req;
        const dailyCaloUpdate = await DailyCalo.findOne({
            where: {
                userId: userId,
                date: date,
            },
        });

        if (!dailyCaloUpdate) {
            return null;
        }

        await dailyCaloUpdate.update({
            caloriesIntake: caloriesIntake,
            caloriesConsumed: caloriesConsumed,
        });

        return dailyCaloUpdate;
    },
    delete: async (userId: number, date: string) => {
        const numDeleted = await DailyCalo.destroy({
            where: {
                userId: userId,
                date: date,
            },
        });
        return numDeleted > 0;
    },
};

export default DailyCaloService;
