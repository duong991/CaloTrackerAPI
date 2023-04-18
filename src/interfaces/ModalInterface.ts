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

export {
    MealFoodAttributes,
    MealMenuAttributes,
    DailyMenuAttributes,
    MenuAttributes,
};
