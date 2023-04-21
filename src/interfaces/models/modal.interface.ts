interface DailyMenuAttributes {
    id: number;
    userId: number;
    menuId?: number;
    userMenuId?: number;
    date: Date;
    note?: string;
}

interface ExerciseAttributes {
    id: number;
    name: string;
    caloriesBurned: number;
    duration: number;
}

interface FoodAttributes {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    foodType: string;
}

interface MealAttributes {
    id: number;
    name: string;
    description: string;
    image?: Buffer;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}

interface MenuAttributes {
    id: number;
    userId?: number;
    name: string;
    description: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
}

interface MealFoodAttributes {
    id: number;
    userMealFoodId: number;
    foodId: number;
    servingSize: number;
}

interface MealMenuAttributes {
    id: number;
    menuId: number;
    mealId?: number;
    userMealId?: number;
}

export {
    DailyMenuAttributes,
    ExerciseAttributes,
    FoodAttributes,
    MealAttributes,
    MenuAttributes,
    MealFoodAttributes,
    MealMenuAttributes,
};
