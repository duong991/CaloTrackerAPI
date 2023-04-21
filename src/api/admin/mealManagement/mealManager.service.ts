import Meal from '../../../models/Meal';
import Food from '../../../models/Food';
import MealFood from '../../../models/MealFood';
import MealMenu from '../../../models/MealMenu';
import Menu from '../../../models/Menu';
import {
    ICreateMealRequest,
    IUpdateMealRequest,
} from '../../../interfaces/requests/admin/meal-interface';
import { Transaction } from 'sequelize';
import { sequelize } from '../../../config/connectDB';

interface IMealManagerService {
    getAllMeals(): Promise<Meal[]>;
    getMealById(id: number): Promise<Meal | null>;
    createMeal(req: ICreateMealRequest): Promise<Meal>;
    updateMeal(mealId: number, req: IUpdateMealRequest): Promise<boolean>;
    deleteMeal(mealId: number): Promise<boolean>;
}

const MealManagerService: IMealManagerService = {
    getAllMeals: async (): Promise<Meal[]> => {
        const meals = await Meal.findAll({
            include: {
                model: MealFood,
                as: 'MealFood',
                include: [
                    {
                        model: Food,
                        as: 'Food',
                    },
                    {
                        model: Food,
                        as: 'Food',
                    },
                ],
            },
        });
        return meals;
    },
    getMealById: async (id: number): Promise<Meal | null> => {
        const meal = await Meal.findByPk(id, {
            include: [
                {
                    model: MealFood,
                    as: 'MealFood',
                    include: [
                        {
                            model: Food,
                            as: 'Food',
                        },
                        {
                            model: Food,
                            as: 'Food',
                        },
                    ],
                },
            ],
        });
        return meal;
    },
    createMeal: async (req: ICreateMealRequest): Promise<Meal> => {
        const {
            name,
            description,
            image,
            calories,
            protein,
            carbohydrates,
            fat,
            mealType,
            mealFood,
        } = req;
        const newMeal = await Meal.create({
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
        mealFood.map(async (item) => {
            await MealFood.create({
                mealId: newMealId,
                foodId: item.foodId,
                servingSize: item.servingSize,
            });
        });
        return newMeal;
    },
    updateMeal: async (
        mealId: number,
        req: IUpdateMealRequest,
    ): Promise<boolean> => {
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
            mealFood,
        } = req;
        try {
            // Tìm tất cả các id bản ghi trong bảng MealFood có chứa mealId
            const foodMeal = await MealFood.findAll({
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

            // lấy ra các bản ghi không có id trong bảng MealFood
            const newFoodMeals = mealFood.filter((item) => {
                return !item.id;
            });
            // lấy ra các id của bản ghi cần xóa trong bảng MealFood
            // (các bản ghi có id nhưng không có trong mảng mealFood được gửi lên)
            // ta thực hiện lấy ra các id của các bản ghi không có trong mảng mealFood
            // và có trong mảng foodMealIds
            const deleteFoodMealIds = foodMealIds.filter((item) => {
                return !mealFood.find((foodMeal) => {
                    return foodMeal.id === item;
                });
            });
            // thưc hiện xóa các bản ghi trong bảng MealFood
            await MealFood.destroy({
                where: {
                    id: deleteFoodMealIds,
                },
                transaction: t,
            });
            // thực hiện cập nhật các bản ghi trong bảng MealFood
            for (let i = 0; i < mealFood.length; i++) {
                const foodMeal = mealFood[i];
                if (foodMeal.id) {
                    await MealFood.update(
                        {
                            mealId: mealId,
                            foodId: foodMeal.foodId,
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
            // thực hiện tạo mới các bản ghi trong bảng MealFood
            for (let i = 0; i < newFoodMeals.length; i++) {
                const newFoodMeal = newFoodMeals[i];
                await MealFood.create(
                    {
                        mealId: mealId,
                        foodId: newFoodMeal.foodId,
                        servingSize: newFoodMeal.servingSize,
                    },
                    {
                        transaction: t,
                    },
                );
            }

            // Cập nhật bảng Meal
            await Meal.update(
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
            await MealFood.destroy({
                where: {
                    mealId: mealId,
                },
                transaction: t,
            });
            await MealMenu.destroy({
                where: {
                    mealId: mealId,
                },
                transaction: t,
            });
            await Meal.destroy({
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

export default MealManagerService;
