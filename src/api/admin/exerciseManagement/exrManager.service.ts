import Exercise from '../../../models/Exercise';
import {
    ICreateExr,
    IUpdateExr,
} from '../../../interfaces/requests/admin/exr-interface';
interface IExrManageService {
    getExrById: (id: number) => Promise<Exercise | null>;
    getAllExr: () => Promise<Exercise[] | null>;
    createExr: (req: ICreateExr) => Promise<Exercise | boolean>;
    updateExr: (
        exrId: number,
        req: IUpdateExr,
    ) => Promise<[number, Exercise[]]>;
    deleteExr: (id: number) => Promise<number>;
}

const ExrManageService: IExrManageService = {
    getExrById: async (id: number): Promise<Exercise | null> => {
        const exr = await Exercise.findByPk(id);
        return exr;
    },

    getAllExr: async (): Promise<Exercise[] | null> => {
        const accounts = await Exercise.findAll();
        return accounts;
    },
    createExr: async (req: ICreateExr): Promise<Exercise | boolean> => {
        const { name, caloriesBurned, duration } = req;
        const isExist = await Exercise.findOne({ where: { name: name } });
        if (!isExist) {
            return false;
        }
        const newExr = await Exercise.create({
            name,
            caloriesBurned,
            duration,
        });
        return newExr;
    },

    updateExr: async (
        exrId: number,
        req: IUpdateExr,
    ): Promise<[number, Exercise[]]> => {
        const { name, caloriesBurned, duration } = req;
        const [numberOfAffectedRows, [updatedUser]] = await Exercise.update(
            { name, caloriesBurned, duration },
            { where: { id: exrId }, returning: true },
        );
        return [numberOfAffectedRows, [updatedUser]];
    },

    deleteExr: async (id: number): Promise<number> => {
        const numberOfDeletedRows = await Exercise.destroy({ where: { id } });
        return numberOfDeletedRows;
    },
};

export default ExrManageService;
