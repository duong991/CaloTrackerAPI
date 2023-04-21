interface IMealFood {
    mealId: number;
    foodId: number;
    servingSize: number;
}

interface IUpdateMealFood {
    id?: number;
    mealId: number;
    foodId: number;
    servingSize: number;
}

export { IMealFood, IUpdateMealFood };
