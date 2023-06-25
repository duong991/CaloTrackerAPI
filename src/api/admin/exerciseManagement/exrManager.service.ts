import Exercise from '../../../models/Exercise';
import {
    ICreateExr,
    IUpdateExr,
} from '../../../interfaces/requests/admin/exr-interface';
interface IExrManageService {
    createExr: (req: ICreateExr) => Promise<Exercise | boolean>;
    updateExr: (exrId: number, req: IUpdateExr) => Promise<boolean>;
    deleteExr: (id: number) => Promise<number>;
}

const ExrManageService: IExrManageService = {
    createExr: async (req: ICreateExr): Promise<Exercise | boolean> => {
        const { name, caloriesBurned, duration } = req;
        const isExist = await Exercise.findOne({ where: { name: name } });
        if (isExist) {
            return false;
        }
        const newExr = await Exercise.create({
            name,
            caloriesBurned,
            duration,
        });
        return newExr;
    },

    updateExr: async (exrId: number, req: IUpdateExr): Promise<boolean> => {
        const { name, caloriesBurned, duration } = req;
        const exr = await Exercise.findOne({ where: { id: exrId } });
        if (!exr) {
            return false;
        }
        exr.name = name;
        exr.caloriesBurned = caloriesBurned;
        exr.duration = duration;
        await exr.save();
        return true;
    },

    deleteExr: async (id: number): Promise<number> => {
        const numberOfDeletedRows = await Exercise.destroy({ where: { id } });
        return numberOfDeletedRows;
    },
};

export default ExrManageService;
