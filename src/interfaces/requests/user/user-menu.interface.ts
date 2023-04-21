import { IUserMealMenu, IUpdateUserMealMenu } from './user-meal-menu.interface';
interface ICreateUserMenuRequest {
    userId: number;
    name: string;
    description: string;
    userMealMenu: IUserMealMenu[];
}

interface IUpdateUserMenuRequest {
    name: string;
    description: string;
    userMealMenu: IUpdateUserMealMenu[];
}

export { ICreateUserMenuRequest, IUpdateUserMenuRequest };
