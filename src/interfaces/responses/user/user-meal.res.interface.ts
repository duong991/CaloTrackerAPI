interface IUserMealFoodResponse {
    id: number;
    mealId: number;
    foodId?: number;
    userFoodId?: number;
    serviceSize: number;
}
export interface IUserMealResponse {
    id: number;
    userId: number;
    name: string;
    description?: string;
    image?: Blob;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
    userMealFood: IUserMealFoodResponse[];
}
