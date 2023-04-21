import { ICreateMealMenu, IUpdateMealMenu } from './meal-menu.interface';
interface ICreateMenuRequest {
    userId: number;
    name: string;
    description?: string;
    mealMenu: ICreateMealMenu[];
}

interface IUpdateMenuRequest {
    name: string;
    description?: string;
    mealMenu: IUpdateMealMenu[];
}

export { ICreateMenuRequest, IUpdateMenuRequest };
