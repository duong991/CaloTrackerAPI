import Meal from '../../../models/Meal';
import Food from '../../../models/Food';
import MealFood from '../../../models/MealFood';
// import MealMenu from '../../../models/MealMenu';
// import Menu from '../../../models/Menu';
import {
    ICreateMealRequest,
    IUpdateMealRequest,
} from '../../../interfaces/requests/admin/meal-interface';
import { Transaction } from 'sequelize';
import { sequelize } from '../../../config/connectDB';

interface IMealManagerService {
    getTableMeals(): Promise<Meal[]>;
    createMeal(req: ICreateMealRequest): Promise<Meal>;
    updateMeal(mealId: number, req: IUpdateMealRequest): Promise<boolean>;
    deleteMeal(mealId: number): Promise<boolean>;
    getDetailMeal(mealId: number): Promise<Meal | null>;
}

const MealManagerService: IMealManagerService = {
    getTableMeals: async (): Promise<Meal[]> => {
        const meals = await Meal.findAll();
        return meals;
    },
    createMeal: async (req: ICreateMealRequest): Promise<Meal> => {
        const {
            name,
            description,
            // image,
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
            // image,
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
            // delete old meal food
            await MealFood.destroy({
                where: {
                    mealId: mealId,
                },
                transaction: t,
            });
            // create new meal food
            mealFood.map(async (item) => {
                await MealFood.create({
                    mealId: mealId,
                    foodId: item.foodId,
                    servingSize: item.servingSize,
                });
            });

            // update meal
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
            // await MealMenu.destroy({
            //     where: {
            //         mealId: mealId,
            //     },
            //     transaction: t,
            // });
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

    getDetailMeal: async (mealId: number): Promise<Meal | null> => {
        const meal = await Meal.findOne({
            where: {
                id: mealId,
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
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

export default MealManagerService;
