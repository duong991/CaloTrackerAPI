import UserFood from '../../models/UserFood';
import { Op } from 'sequelize';
import { IDataRequestUserFood } from '../../interfaces/requests/user/user-food.interface';
interface IUserFoodService {
    getAllFoods: (userId: number) => Promise<UserFood[] | null>;
    getFoodById: (id: number) => Promise<UserFood | null>;
    createFood: (
        userId: number,
        data: IDataRequestUserFood,
    ) => Promise<UserFood | Error>;
    updateFood: (
        id: number,
        req: IDataRequestUserFood,
    ) => Promise<UserFood | null>;
    deleteFood: (id: number) => Promise<boolean>;
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

    createFood: async (
        userId: number,
        data: IDataRequestUserFood,
    ): Promise<UserFood | Error> => {
        const { name, calories, protein, carbohydrates, fat } = data;
        const isExist = await UserFood.findOne({
            where: {
                name: name,
                userId: userId,
            },
        });
        if (isExist) {
            throw new Error('Food already exists');
        }
        return await UserFood.create({
            userId: userId,
            name: name,
            calories: calories,
            protein: protein,
            carbohydrates: carbohydrates,
            fat: fat,
        });
    },

    updateFood: async (id: number, req: IDataRequestUserFood) => {
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
    deleteFood: async (id: number) => {
        const numDeleted = await UserFood.destroy({
            where: {
                id: id,
            },
        });
        return numDeleted > 0;
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
