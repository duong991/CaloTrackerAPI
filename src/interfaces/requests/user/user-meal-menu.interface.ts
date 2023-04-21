interface IUserMealMenu {
    menuId: number;
    mealId?: number;
    userMealId?: number;
}

interface IUpdateUserMealMenu {
    id?: number;
    menuId: number;
    mealId?: number;
    userMealId?: number;
}

export { IUserMealMenu, IUpdateUserMealMenu };
