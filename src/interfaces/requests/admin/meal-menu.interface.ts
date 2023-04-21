interface ICreateMealMenu {
    menuId: number;
    mealId: number;
}

interface IUpdateMealMenu {
    id?: number;
    menuId: number;
    mealId: number;
}

export { ICreateMealMenu, IUpdateMealMenu };
