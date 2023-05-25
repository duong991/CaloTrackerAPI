import UserMeal from '../../models/UserMeal';
import UserMealFood from '../../models/UserMealFood';
import Food from '../../models/Food';
import UserFood from '../../models/UserFood';
import UserMealMenu from '../../models/UserMealMenu';
import UserMenu from '../../models/UserMenu';
import {
    ICreateUserMealRequest,
    IUpdateUserMealRequest,
} from '../../interfaces/requests/user/user-meal.interface';
import { Transaction } from 'sequelize';
import { sequelize } from '../../config/connectDB';
interface IUserMealService {
    getAllMeals(userId: number): Promise<UserMeal[]>;
    getAllMealsByUserId(userId: number): Promise<UserMeal[]>;
    getMealById(id: number): Promise<UserMeal | null>;
    createMeal(
        userId: number,
        data: ICreateUserMealRequest,
    ): Promise<UserMeal | Error>;
    updateMeal(mealId: number, req: IUpdateUserMealRequest): Promise<boolean>;
    deleteMeal(mealId: number): Promise<boolean>;
}

const UserMealService: IUserMealService = {
    getAllMeals: async (userId: number): Promise<UserMeal[]> => {
        const meals = await UserMeal.findAll({
            where: { userId: userId },
            include: {
                model: UserMealFood,
                as: 'userMealFoods',
            },
        });
        return meals;
    },
    getAllMealsByUserId: async (userId: number): Promise<UserMeal[]> => {
        const meals = await UserMeal.findAll({
            where: { userId: userId },
            include: {
                model: UserMealFood,
                as: 'userMealFoods',
                include: [
                    {
                        model: Food,
                        as: 'food',
                    },
                    {
                        model: UserFood,
                        as: 'userFood',
                    },
                ],
            },
        });
        return meals;
    },
    getMealById: async (id: number): Promise<UserMeal | null> => {
        const userMeal = await UserMeal.findByPk(id, {
            include: [
                {
                    model: UserMealFood,
                    as: 'userMealFoods',
                    include: [
                        {
                            model: Food,
                            as: 'food',
                        },
                        {
                            model: UserFood,
                            as: 'userFood',
                        },
                    ],
                },
            ],
        });
        return userMeal;
    },
    createMeal: async (
        userId: number,
        data: ICreateUserMealRequest,
    ): Promise<UserMeal | Error> => {
        const {
            name,
            description,
            image,
            calories,
            protein,
            carbohydrates,
            fat,
            mealType,
            userMealFood,
        } = data;
        const isExist = await UserMeal.findOne({
            where: {
                name: name,
                userId: userId,
            },
        });

        if (!isExist) {
            throw new Error('Meal already exists');
        }

        const newMeal = await UserMeal.create({
            userId,
            name,
            description,
            image,
            calories,
            protein,
            carbohydrates,
            fat,
            mealType,
        });
        const newMealId = newMeal.id;
        userMealFood.map(async (item) => {
            await UserMealFood.create({
                mealId: newMealId,
                foodId: item.foodId,
                userFoodId: item.userFoodId,
                servingSize: item.servingSize,
            });
        });
        return newMeal;
    },
    updateMeal: async (
        mealId: number,
        req: IUpdateUserMealRequest,
    ): Promise<boolean> => {
        // tạo transaction để đảm bảo tính toàn vẹn dữ liệu
        const t: Transaction = await sequelize.transaction();
        const {
            name,
            description,
            image,
            calories,
            protein,
            carbohydrates,
            fat,
            mealType,
            userMealFood,
        } = req;
        try {
            // Tìm tất cả các id bản ghi trong bảng UserMealFood có chứa mealId
            const foodMeal = await UserMealFood.findAll({
                attributes: ['id'],
                where: {
                    mealId: mealId,
                },
                transaction: t,
            });
            // chuyển sang mảng các id
            const foodMealIds = [];
            for (let i = 0; i < foodMeal.length; i++) {
                foodMealIds.push(foodMeal[i].id);
            }

            // lấy ra các bản ghi không có id trong bảng UserMealFood
            const newFoodMeals = userMealFood.filter((item) => {
                return !item.id;
            });
            // lấy ra các id của bản ghi cần xóa trong bảng UserMealFood
            // (các bản ghi có id nhưng không có trong mảng userMealFood được gửi lên)
            // ta thực hiện lấy ra các id của các bản ghi không có trong mảng userMealFood
            // và có trong mảng foodMealIds
            const deleteFoodMealIds = foodMealIds.filter((item) => {
                return !userMealFood.find((foodMeal) => {
                    return foodMeal.id === item;
                });
            });
            // thưc hiện xóa các bản ghi trong bảng UserMealFood
            await UserMealFood.destroy({
                where: {
                    id: deleteFoodMealIds,
                },
                transaction: t,
            });
            // thực hiện cập nhật các bản ghi trong bảng UserMealFood
            for (let i = 0; i < userMealFood.length; i++) {
                const foodMeal = userMealFood[i];
                if (foodMeal.id) {
                    await UserMealFood.update(
                        {
                            mealId: mealId,
                            foodId: foodMeal.foodId,
                            userFoodId: foodMeal.userFoodId,
                            servingSize: foodMeal.servingSize,
                        },
                        {
                            where: {
                                id: foodMeal.id,
                            },
                            transaction: t,
                        },
                    );
                }
            }
            // thực hiện tạo mới các bản ghi trong bảng UserMealFood
            for (let i = 0; i < newFoodMeals.length; i++) {
                const newFoodMeal = newFoodMeals[i];
                await UserMealFood.create(
                    {
                        mealId: mealId,
                        foodId: newFoodMeal.foodId,
                        userFoodId: newFoodMeal.userFoodId,
                        servingSize: newFoodMeal.servingSize,
                    },
                    {
                        transaction: t,
                    },
                );
            }

            // Cập nhật bảng Meal
            await UserMeal.update(
                {
                    name,
                    description,
                    image,
                    calories,
                    protein,
                    carbohydrates,
                    fat,
                    mealType,
                },
                {
                    where: {
                        id: mealId,
                    },
                    transaction: t,
                },
            );

            // Commit transaction
            await t.commit();
            return true;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    },

    deleteMeal: async (mealId: number): Promise<boolean> => {
        const t: Transaction = await sequelize.transaction();
        try {
            await UserMealFood.destroy({
                where: {
                    mealId: mealId,
                },
                transaction: t,
            });
            await UserMealMenu.destroy({
                where: {
                    mealId: mealId,
                },
                transaction: t,
            });
            await UserMeal.destroy({
                where: {
                    id: mealId,
                },
                transaction: t,
            });
            await t.commit();
            return true;
        } catch (error) {
            await t.rollback();
            console.error(error);
            return false;
        }
    },
};
export default UserMealService;
