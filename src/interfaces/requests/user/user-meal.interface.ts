import { IUserMealFood, IUpdateUserMealFood } from './user-meal-food.interface';

interface Food {
    id: number;
    servingSize: number;
}
interface ICreateUserMealRequest {
    name: string;
    description?: string;
    image?: Blob;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    systemFood: Food[] | [];
    userFood: Food[] | [];
}

interface IUpdateUserMealRequest {
    name: string;
    description?: string;
    image?: Blob;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    userMealFood: IUpdateUserMealFood[];
}

export { ICreateUserMealRequest, IUpdateUserMealRequest };
