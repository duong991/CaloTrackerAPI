import Exercise from '../../models/Exercise';
import Food from '../../models/Food';
import Meal from '../../models/Meal';
import MealFood from '../../models/MealFood';
interface ISystemService {
    getExrById: (id: number) => Promise<Exercise | null>;
    getAllExr: () => Promise<Exercise[] | null>;
    getFoodById: (id: number) => Promise<Food | null>;
    getAllFood: () => Promise<Food[] | null>;
    getMealById(id: number): Promise<Meal | null>;
    getAllMeals(): Promise<Meal[] | null>;
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
        const meals = await Meal.findAll(
            applyExcludeTimestamps({
                include: [
                    {
                        model: MealFood,
                        as: 'mealFoods',
                        include: [
                            {
                                model: Food,
                                as: 'food',
                                attributes: {
                                    exclude: ['createdAt', 'updatedAt'],
                                },
                            },
                        ],
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    },
                ],
            }),
        );
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
};

export default SystemService;
