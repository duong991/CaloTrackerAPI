interface IUserMealFood {
    foodId?: number;
    userFoodId?: number;
    servingSize: number;
}

interface IUpdateUserMealFood {
    id?: number;
    mealId: number;
    foodId?: number;
    userFoodId?: number;
    servingSize: number;
}

export { IUserMealFood, IUpdateUserMealFood };
