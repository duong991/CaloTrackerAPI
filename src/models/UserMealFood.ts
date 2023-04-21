import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';

import UserMeal from './UserMeal';
import UserFood from './UserFood';
import Food from './Food';

class UserMealFood extends Model {
    public id!: number;
    public mealId!: number;
    public foodId?: number;
    public userFoodId?: number;
    public servingSize!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        UserMealFood.belongsTo(UserMeal, {
            foreignKey: 'mealId',
            as: 'UserMeal',
        });
        UserMealFood.belongsTo(Food, { foreignKey: 'foodId' });
        UserMealFood.belongsTo(UserFood, {
            foreignKey: 'userFoodId',
        });
    };
}

UserMealFood.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        mealId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UserMeal,
                key: 'id',
            },
        },
        foodId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Food,
                key: 'id',
            },
        },
        userFoodId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: UserFood,
                key: 'id',
            },
        },
        servingSize: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'UserMealFood',
        tableName: 'User_Meal_Foods',
    },
);

export default UserMealFood;
