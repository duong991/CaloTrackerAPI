import UserFood from '../../models/UserFood';
import { Op } from 'sequelize';
import {
    ICreateUserFood,
    IUpdateUserFood,
} from '../../interfaces/requests/user/user-food.interface';
interface IUserFoodService {
    getAllFoods: (userId: number) => Promise<UserFood[] | null>;
    getFoodById: (id: number) => Promise<UserFood | null>;
    createFood: (req: ICreateUserFood) => Promise<UserFood>;
    updateFood: (id: number, req: IUpdateUserFood) => Promise<UserFood | null>;
    deleteFoods: (ids: number[]) => Promise<number>;
    checkUserFoods: (ids: number[], userId: number) => Promise<boolean>;
}
const UserFoodService: IUserFoodService = {
    getAllFoods: async (userId: number): Promise<UserFood[] | null> => {
        const foods = await UserFood.findAll({
            where: { userId: userId },
        });
        return foods;
    },

    getFoodById: async (id: number): Promise<UserFood | null> => {
        const food = await UserFood.findByPk(id);
        return food;
    },

    createFood: async (req: ICreateUserFood) => {
        const { userId, name, calories, protein, carbohydrates, fat } = req;
        return await UserFood.create({
            userId: userId,
            name: name,
            calories: calories,
            protein: protein,
            carbohydrates: carbohydrates,
            fat: fat,
        });
    },

    updateFood: async (id: number, req: IUpdateUserFood) => {
        const { name, calories, protein, carbohydrates, fat } = req;
        const foodToUpdate = await UserFood.findByPk(id);

        if (!foodToUpdate) {
            return null;
        }

        await foodToUpdate.update({
            name: name,
            calories: calories,
            protein: protein,
            carbohydrates: carbohydrates,
            fat: fat,
        });

        return foodToUpdate;
    },

    deleteFoods: async (ids: number[]) => {
        const numDeleted = await UserFood.destroy({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
        });
        return numDeleted;
    },
    checkUserFoods: async (ids: number[], userId: number) => {
        const foods = await UserFood.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
                userId: userId,
            },
        });
        return foods.length === ids.length;
    },
};

export default UserFoodService;
