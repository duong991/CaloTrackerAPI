interface MealMenuAttributes {
    id: number;
    menuId: number;
    mealId: number;
    userMealId?: number;
}

interface MealFoodAttributes {
    id: number;
    userMealFoodId: number;
    foodId: number;
    servingSize: number;
}

interface DailyMenuAttributes {
    id: number;
    userId: number;
    menuId?: number;
    userMenuId?: number;
    date: Date;
    note?: string;
}

interface MenuAttributes {
    id: number;
    userId?: number;
    name: string;
    description: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
}

interface FoodAttributes {
    id: number;
    userId: number;
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}
export {
    MealFoodAttributes,
    MealMenuAttributes,
    DailyMenuAttributes,
    MenuAttributes,
    FoodAttributes,
};
