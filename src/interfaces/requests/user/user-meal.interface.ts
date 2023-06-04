import { IUserMealFood, IUpdateUserMealFood } from './user-meal-food.interface';
interface ICreateUserMealRequest {
    name: string;
    description?: string;
    image?: Blob;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
    userMealFood: IUserMealFood[];
}

interface IUpdateUserMealRequest {
    name: string;
    description?: string;
    image?: Blob;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
    userMealFood: IUpdateUserMealFood[];
}

export { ICreateUserMealRequest, IUpdateUserMealRequest };
