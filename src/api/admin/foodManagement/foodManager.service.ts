import Food from '../../../models/Food';
import {
    ICreateFood,
    IUpdateFood,
} from '../../../interfaces/requests/admin/food-interface';

interface IFoodManageService {
    createFood: (req: ICreateFood) => Promise<Food | boolean>;
    updateFood: (id: number, req: IUpdateFood) => Promise<boolean>;
    deleteFood: (id: number) => Promise<number>;
    importFood: (data: any[]) => Promise<void>;
}

const FoodManageService: IFoodManageService = {
    createFood: async (req: ICreateFood): Promise<Food | boolean> => {
        const { name, calories, protein, carbohydrates, fat } = req;
        const isExist = await Food.findOne({ where: { name: name } });
        if (isExist) {
            return false;
        }
        const newUser = await Food.create({
            name,
            calories,
            protein,
            carbohydrates,
            fat,
        });
        return newUser;
    },

    updateFood: async (id: number, req: IUpdateFood): Promise<boolean> => {
        const { name, calories, protein, carbohydrates, fat } = req;
        const food = await Food.findOne({ where: { id } });
        if (!food) {
            return false;
        }
        food.name = name;
        food.calories = calories;
        food.protein = protein;
        food.carbohydrates = carbohydrates;
        food.fat = fat;
        await food.save();
        return true;
    },

    deleteFood: async (id: number): Promise<number> => {
        const numberOfDeletedRows = await Food.destroy({ where: { id } });
        return numberOfDeletedRows;
    },

    importFood: async (data: any[]): Promise<void> => {
        for (const item of data) {
            const { name, calories, protein, carbohydrates, fat } = item;

            await Food.create({ name, calories, protein, carbohydrates, fat });
        }
    },
};

export default FoodManageService;
