import Exercise from '../../models/Exercise';
import Food from '../../models/Food';
import Meal from '../../models/Meal';
import MealFood from '../../models/MealFood';

type TDataGetPaper = {
    start: number;
    length: number;
};
interface ISystemService {
    getExrById: (id: number) => Promise<Exercise | null>;
    getAllExr: () => Promise<Exercise[] | null>;
    getFoodById: (id: number) => Promise<Food | null>;
    getAllFood: () => Promise<Food[] | null>;
    getMealById(id: number): Promise<Meal | null>;
    getAllMeals(): Promise<Meal[] | null>;

    getFoodPaper(
        data: TDataGetPaper,
    ): Promise<{ foods: Food[]; count: number }>;
    getExercisePaper(
        data: TDataGetPaper,
    ): Promise<{ exercises: Exercise[]; count: number }>;
    getMealPaper(
        data: TDataGetPaper,
    ): Promise<{ meals: Meal[]; count: number }>;
}

const applyExcludeTimestamps = (options: any) => {
    return {
        ...options,
        attributes: {
            ...options.attributes,
            exclude: ['createdAt', 'updatedAt'],
        },
    };
};

const SystemService: ISystemService = {
    getExrById: async (id: number): Promise<Exercise | null> => {
        const exr = await Exercise.findByPk(id);
        return exr;
    },

    getAllExr: async (): Promise<Exercise[] | null> => {
        const exercises = await Exercise.findAll(applyExcludeTimestamps({}));
        return exercises;
    },

    getFoodById: async (id: number): Promise<Food | null> => {
        const food = await Food.findByPk(id);
        return food;
    },

    getAllFood: async (): Promise<Food[] | null> => {
        const foods = await Food.findAll(applyExcludeTimestamps({}));
        return foods;
    },
    getAllMeals: async (): Promise<Meal[] | null> => {
        const meals = await Meal.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'image'] },
        });
        return meals;
    },
    getMealById: async (id: number): Promise<Meal | null> => {
        const meal = await Meal.findByPk(id, {
            include: [
                {
                    model: MealFood,
                    as: 'mealFoods',
                    include: [
                        {
                            model: Food,
                            as: 'food',
                        },
                    ],
                },
            ],
        });
        return meal;
    },

    getFoodPaper: async (data): Promise<{ foods: Food[]; count: number }> => {
        const count = await Food.count();
        const foods = await Food.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            offset: data.start,
            limit: data.length,
        });
        return {
            foods,
            count,
        };
    },
    getExercisePaper: async (
        data,
    ): Promise<{ exercises: Exercise[]; count: number }> => {
        const count = await Exercise.count();
        const exercises = await Exercise.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            offset: data.start,
            limit: data.length,
        });
        return {
            exercises,
            count,
        };
    },

    getMealPaper: async (data): Promise<{ meals: Meal[]; count: number }> => {
        const count = await Meal.count();
        const meals = await Meal.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'image'] },
            offset: data.start,
            limit: data.length,
        });
        return {
            meals,
            count,
        };
    },
};

export default SystemService;
