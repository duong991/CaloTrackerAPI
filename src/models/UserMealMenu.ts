import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';

import Meal from './Meal';
import UserMeal from './UserMeal';
import { MealMenuAttributes } from '../interfaces/ModalInterface';
import UserMenu from './UserMenu';

class UserMealMenu
    extends Model<MealMenuAttributes>
    // eslint-disable-next-line prettier/prettier
    implements MealMenuAttributes {
    public id!: number;
    public menuId!: number;
    public mealId!: number;
    public userMealId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        UserMealMenu.belongsTo(UserMeal, { foreignKey: 'menuId', as: 'Menu' });
        UserMealMenu.belongsTo(Meal, {
            foreignKey: 'mealId',
            targetKey: 'id',
            as: 'Meal',
        });
        UserMealMenu.belongsTo(UserMeal, {
            foreignKey: 'mealId',
            targetKey: 'id',
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
            allowNull: false,
            references: {
                model: Meal,
                key: 'id',
            },
        },
        userMealId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
