/* eslint-disable prettier/prettier */
import { Op } from 'sequelize';
import UserInfo from '../../models/UserInfo';
import Exercise from '../../models/Exercise';
import Food from '../../models/Food';
import Meal from '../../models/Meal';
import Menu from '../../models/Menu';
import UserExercise from '../../models/UserExercise';
import UserFood from '../../models/UserFood';
import UserMeal from '../../models/UserMeal';
import UserMealFood from '../../models/UserMealFood';
import UserMealMenu from '../../models/UserMealMenu';
import WaterLog from '../../models/WaterLog';
import UserWeightHistory from '../../models/UserWeightHistory';
import UserMenu from '../../models/UserMenu';
import DailyCalo from '../../models/DailyCalo';
import DailyCaloFoodMapping from '../../models/DailyCaloFoodMapping';
import MealFood from '../../models/MealFood';
import MealMenu from '../../models/MealMenu';
interface IDataService {
    getAllData(userId: number): Promise<any>;
}

const DataService: IDataService = {
    getAllData: async (userId: number): Promise<any> => {
        const userInfo = await UserInfo.findOne({
            where: {
                userId,
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
        const exercises = await Exercise.findAll(
            {
                attributes: { exclude: ['createdAt', 'updatedAt'] },

            }
        );
        const foods = await Food.findAll(
            {
                attributes: { exclude: ['createdAt', 'updatedAt'] },

            }
        );
        const meals = await Meal.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },

        });
        const menus = await Menu.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },

        });
        const userExercise = await UserExercise.findAll({
            where: {
                userId,
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },

        });
        const userFoods = await UserFood.findAll({
            where: {
                userId,
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },

        });

        const userMeals = await UserMeal.findAll({
            where: {
                userId,
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },

        });
        const userMenus = await UserMenu.findAll({
            where: {
                userId,
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },

        });
        const userMealIds = userMeals.map((userMeal) => userMeal.id);
        const userMealFoods = userMealIds.length > 0 ?
            await UserMealFood.findAll({
                where: {
                    mealId: { [Op.in]: userMealIds },
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] },

            })
            : [];

        const userMenuIds = userMenus.map((userMenu) => userMenu.id);
        const userMealMenus = userMealIds.length > 0
            ? await UserMealMenu.findAll({
                where: {
                    menuId: { [Op.in]: userMenuIds },
                },
            })
            : [];

        const mealFoods = await MealFood.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },

        });
        const mealMenus = await MealMenu.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },

        });
        const waterLogs = await WaterLog.findAll({
            where: {
                userId,
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },

        });
        const userWeightHistories = await UserWeightHistory.findAll({
            where: {
                userId,
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },

        });
        const dailyCalos = await DailyCalo.findAll({
            where: {
                userId,
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },

        });
        const dailyCaloIds = dailyCalos.map((dailyCalo) => dailyCalo.id);
        const dailyCaloFoodMapping = dailyCaloIds.length > 0 ?
            await DailyCaloFoodMapping.findAll({
                where: {
                    dailyCaloId: { [Op.in]: dailyCaloIds },
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] },

            }) : [];
        return {
            userInfo,
            userFoods,
            userMealFoods,
            userMeals,
            userMealMenus,
            userMenus,
            foods,
            mealFoods,
            meals,
            mealMenus,
            menus,
            exercises,
            userExercise,
            waterLogs,
            userWeightHistories,
            dailyCalos,
            dailyCaloFoodMapping,
        };
    },
};
export default DataService;
