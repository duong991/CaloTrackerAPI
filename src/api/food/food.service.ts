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
    updateFood: (req: IDataRequestUserFood) => Promise<UserFood | null>;
    deleteFood: (userId: number, id: number) => Promise<boolean>;
    deleteFoods: (ids: number[]) => Promise<number>;
    checkUserFoods: (ids: number[], userId: number) => Promise<boolean>;
}
const UserFoodService: IUserFoodService = {
    getAllFoods: async (userId: number): Promise<UserFood[] | null> => {
        const foods = await UserFood.findAll({
            attributes: [
                'id',
                'name',
                'calories',
                'protein',
                'carbohydrates',
                'fat',
            ],
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

    updateFood: async (req: IDataRequestUserFood) => {
        const { id, name, calories, protein, carbohydrates, fat } = req;
        const foodToUpdate = await UserFood.findByPk(id);
        console.log('foodToUpdate', foodToUpdate);
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
    deleteFood: async (userId: number, id: number) => {
        console.log('userId', userId, 'id', id);
        const food = await UserFood.findOne({
            where: {
                id: id,
                userId: userId,
            },
        });
        console.log('food', food);
        if (!food) {
            return false;
        }
        food.destroy();
        return true;
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
