import { IMealFood, IUpdateMealFood } from './meal-food.interface';
interface ICreateMealRequest {
    name: string;
    description?: string;
    image?: Blob;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    mealFood: IMealFood[];
}

interface IUpdateMealRequest {
    name: string;
    description?: string;
    image?: Blob;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    mealFood: IUpdateMealFood[];
}

export { ICreateMealRequest, IUpdateMealRequest };
