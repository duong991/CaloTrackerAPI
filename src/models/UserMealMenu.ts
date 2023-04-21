/* eslint-disable prettier/prettier */
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';

import Meal from './Meal';
import UserMeal from './UserMeal';
import { UserMealMenuAttributes } from '../interfaces/models/model.interface';
import UserMenu from './UserMenu';

class UserMealMenu
    extends Model<UserMealMenuAttributes>
    implements UserMealMenuAttributes {
    public id!: number;
    public menuId!: number;
    public mealId?: number;
    public userMealId?: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        UserMealMenu.belongsTo(UserMenu, {
            foreignKey: 'menuId',
            as: 'UserMenu',
        });
        UserMealMenu.belongsTo(Meal, {
            foreignKey: 'mealId',
            as: 'Meal',
        });
        UserMealMenu.belongsTo(UserMeal, {
            foreignKey: 'userMealId',
            as: 'UserMeal',
        });
    };
}

UserMealMenu.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        menuId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UserMenu,
                key: 'id',
            },
        },
        mealId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Meal,
                key: 'id',
            },
        },
        userMealId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: UserMeal,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'UserMealMenu',
        tableName: 'User_Meal_Menus',
    },
);

export default UserMealMenu;
