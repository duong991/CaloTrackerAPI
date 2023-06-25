import Food from '../../models/Food';
import Exercise from '../../models/Exercise';
import Meal from '../../models/Meal';
interface IFoodManageService {
    exportExcelFood: () => Promise<Food[]>;
    exportExcelExercise: () => Promise<Exercise[]>;
    exportExcelMeal: () => Promise<Meal[]>;
}

const ExcelService: IFoodManageService = {
    exportExcelFood: async (): Promise<Food[]> => {
        const data = await Food.findAll();
        return data;
    },
    exportExcelExercise: async (): Promise<Exercise[]> => {
        const data = await Exercise.findAll();
        return data;
    },
    exportExcelMeal: async (): Promise<Meal[]> => {
        const data = await Meal.findAll();
        return data;
    },
};

export default ExcelService;
