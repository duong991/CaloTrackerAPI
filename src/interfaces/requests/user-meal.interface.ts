import { IUserMealFood, IUpdateUserMealFood } from './user-meal-food.interface';
interface ICreateUserMealRequest {
    userId: number;
    name: string;
    description: string | null;
    image: string | null;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    userMealFood: IUserMealFood[];
}

interface IUpdateUserMealRequest {
    name: string;
    description: string | null;
    image: string | null;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    userMealFood: IUpdateUserMealFood[];
}

export { ICreateUserMealRequest, IUpdateUserMealRequest };
