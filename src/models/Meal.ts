import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import MealFood from './MealFood';
import MealMenu from './MealMenu';
import UserMealMenu from './UserMealMenu';
import DailyCaloFoodMapping from './DailyCaloFoodMapping';

import { MealAttributes } from '../interfaces/models/model.interface';

class Meal extends Model<MealAttributes> implements MealAttributes {
    public id!: number;
    public name!: string;
    public description?: string;
    public image?: Buffer; // khai báo image là kiểu Buffer
    public calories!: number;
    public protein!: number;
    public carbohydrates!: number;
    public fat!: number;
    public mealType!: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
    public static associate = () => {
        Meal.hasMany(MealFood, {
            foreignKey: 'mealId',
            as: 'mealFoods',
        });
        Meal.hasMany(MealMenu, {
            foreignKey: 'mealId',
            as: 'mealMenus',
        });
        Meal.hasMany(DailyCaloFoodMapping, {
            foreignKey: 'mealId',
            as: 'dailyCaloFoodMappings',
        });
        Meal.hasMany(UserMealMenu, {
            foreignKey: 'mealId',
            as: 'userMealMenus',
        });
    };
}

Meal.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        calories: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        protein: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        carbohydrates: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        fat: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        mealType: {
            type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snacks'),
            allowNull: false,
        },
    },
    {
        modelName: 'Meal',
        sequelize,
    },
);

export default Meal;
