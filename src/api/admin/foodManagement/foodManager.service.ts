import Food from '../../../models/Food';
import {
    ICreateFood,
    IUpdateFood,
} from '../../../interfaces/requests/admin/food-interface';
interface IFoodManageService {
    createFood: (req: ICreateFood) => Promise<Food | boolean>;
    getFoodById: (id: number) => Promise<Food | null>;
    getAllFood: () => Promise<Food[] | null>;
    updateFood: (id: number, req: IUpdateFood) => Promise<[number, Food[]]>;
    deleteFood: (id: number) => Promise<number>;
}

const FoodManageService: IFoodManageService = {
    createFood: async (req: ICreateFood): Promise<Food | boolean> => {
        const { name, calories, protein, carbohydrates, fat } = req;
        const isExist = await Food.findOne({ where: { name: name } });
        if (!isExist) {
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

    getFoodById: async (id: number): Promise<Food | null> => {
        const food = await Food.findByPk(id);
        return food;
    },

    getAllFood: async (): Promise<Food[] | null> => {
        const foods = await Food.findAll();
        return foods;
    },

    updateFood: async (
        id: number,
        req: IUpdateFood,
    ): Promise<[number, Food[]]> => {
        const { name, calories, protein, carbohydrates, fat } = req;
        const [numberOfAffectedRows, [updatedUser]] = await Food.update(
            { name, calories, protein, carbohydrates, fat },
            { where: { id }, returning: true },
        );
        return [numberOfAffectedRows, [updatedUser]];
    },

    deleteFood: async (id: number): Promise<number> => {
        const numberOfDeletedRows = await Food.destroy({ where: { id } });
        return numberOfDeletedRows;
    },
};

export default FoodManageService;
