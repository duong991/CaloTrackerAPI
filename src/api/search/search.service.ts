import UserFood from '../../models/UserFood';
import Food from '../../models/Food';
import Meal from '../../models/Meal';
import UserMeal from '../../models/UserMeal';
import Exercise from '../../models/Exercise';
import { Op } from 'sequelize';

interface ISearchService {
    searchUserFoods: (
        userId: number,
        keyword: string,
    ) => Promise<UserFood[] | null>;
    searchFoods: (keyword: string) => Promise<Food[] | null>;
    searchMeals: (keyword: string) => Promise<Meal[] | null>;
    searchUserMeals: (
        userId: number,
        keyword: string,
    ) => Promise<UserMeal[] | null>;
    searchFoodsAndUserFoods: (
        userId: number,
        keyword: string,
    ) => Promise<{ foods: Food[] | null; userFoods: UserFood[] | null }>;

    searchMealsAndUserMeals: (
        userId: number,
        keyword: string,
    ) => Promise<{ meals: Meal[] | null; userMeals: UserMeal[] | null }>;
    searchExercises: (keyword: string) => Promise<Exercise[] | null>;
}

const SearchService: ISearchService = {
    searchUserFoods: async (userId, keyword) => {
        try {
            const userFoods = await UserFood.findAll({
                where: {
                    userId: userId,
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            });
            return userFoods;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    searchFoods: async (keyword) => {
        try {
            const foods = await Food.findAll({
                where: {
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            });
            return foods;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    searchMeals: async (keyword) => {
        try {
            const meals = await Meal.findAll({
                where: {
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            });
            return meals;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    searchUserMeals: async (userId, keyword) => {
        try {
            const userMeals = await UserMeal.findAll({
                where: {
                    userId: userId,
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            });
            return userMeals;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    searchFoodsAndUserFoods: async (userId, keyword) => {
        try {
            const foods = await Food.findAll({
                where: {
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            });

            const userFoods = await UserFood.findAll({
                where: {
                    userId: userId,
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            });

            return { foods, userFoods };
        } catch (error) {
            console.error(error);
            return { foods: null, userFoods: null };
        }
    },
    searchMealsAndUserMeals: async (userId, keyword) => {
        try {
            const meals = await Meal.findAll({
                where: {
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            });

            const userMeals = await UserMeal.findAll({
                where: {
                    userId: userId,
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            });

            return { meals, userMeals };
        } catch (error) {
            console.error(error);
            return { meals: null, userMeals: null };
        }
    },
    searchExercises: async (keyword) => {
        try {
            const exercises = await Exercise.findAll({
                where: {
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            });
            return exercises;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};

export default SearchService;
