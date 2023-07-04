import UserMeal from '../../models/UserMeal';
import UserMealFood from '../../models/UserMealFood';
import Food from '../../models/Food';
import UserFood from '../../models/UserFood';
// import UserMealMenu from '../../models/UserMealMenu';
// import UserMenu from '../../models/UserMenu';
import {
    ICreateUserMealRequest,
    IUpdateUserMealRequest,
} from '../../interfaces/requests/user/user-meal.interface';
import { Transaction } from 'sequelize';
import { sequelize } from '../../config/connectDB';
import { Op } from 'sequelize';

interface IFood {
    id: number;
    serviceSize: number;
}

interface IResponseMealDetails {
    systemFood: IFood[];
    userFood: IFood[];
}
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
    getUserMealDetail(mealId: number): Promise<IResponseMealDetails | null>;
}

const UserMealService: IUserMealService = {
    getAllMeals: async (userId: number): Promise<UserMeal[]> => {
        const meals = await UserMeal.findAll({
            where: { userId: userId },
            include: {
                model: UserMealFood,
                as: 'userMealFoods',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'mealId'],
                },
            },
        });
        return meals;
    },
    getAllMealsByUserId: async (userId: number): Promise<UserMeal[]> => {
        const meals = await UserMeal.findAll({
            where: { userId: userId },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId', 'image'],
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
            systemFood,
            userFood,
        } = data;
        console.log(image);
        const isExist = await UserMeal.findOne({
            where: {
                name: name,
                userId: userId,
            },
            transaction: t,
        });

        if (isExist) {
            throw new Error('Meal already exists');
        }
        try {
            const newMeal = await UserMeal.create(
                {
                    userId,
                    name,
                    description,
                    image,
                    calories,
                    protein,
                    carbohydrates,
                    fat,
                    mealType,
                },
                { transaction: t },
            );
            const newMealId = newMeal.id;
            if (systemFood.length > 0) {
                const newSystemFood = systemFood.map((item) => {
                    return {
                        mealId: newMealId,
                        foodId: item.id,
                        servingSize: item.servingSize,
                    };
                });
                await UserMealFood.bulkCreate(newSystemFood);
            }
            if (userFood.length > 0) {
                const newUserFood = userFood.map((item) => {
                    return {
                        mealId: newMealId,
                        userFoodId: item.id,
                        servingSize: item.servingSize,
                    };
                });
                await UserMealFood.bulkCreate(newUserFood);
            }
            await t.commit();
            return newMeal;
        } catch (error) {
            await t.rollback();
            throw error;
        }
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

    getUserMealDetail: async (
        mealId: number,
    ): Promise<IResponseMealDetails | null> => {
        const userFood: IFood[] = [];
        const systemFood: IFood[] = [];
        const meal = await UserMeal.findByPk(mealId);
        if (!meal) {
            return null;
        }
        const mealFoods = await UserMealFood.findAll({
            where: {
                mealId: mealId,
            },
        });
        mealFoods.map((item) => {
            if (item.foodId) {
                userFood.push({
                    id: item.foodId,
                    serviceSize: item.servingSize,
                });
            } else if (item.userFoodId) {
                systemFood.push({
                    id: item.userFoodId,
                    serviceSize: item.servingSize,
                });
            }
        });
        const dataResponse: IResponseMealDetails = {
            systemFood,
            userFood,
        };
        return dataResponse;
    },
};

export default UserMealService;
