import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import MealFood from './MealFood';
import MealMenu from './MealMenu';
import UserMealMenu from './UserMealMenu';
import { MealAttributes } from '../interfaces/models/modal.interface';

class Meal extends Model<MealAttributes> implements MealAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public image?: Buffer; // khai báo image là kiểu Buffer
    public calories!: number;
    public protein!: number;
    public carbohydrates!: number;
    public fat!: number;

    public static associate = () => {
        Meal.hasMany(MealFood, { foreignKey: 'mealId', as: 'MealFood' });
        Meal.hasMany(MealMenu, { foreignKey: 'mealId', as: 'MealMenu' });
        Meal.hasMany(UserMealMenu, {
            foreignKey: 'mealId',
            as: 'UserMealMenu',
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
    },
    {
        modelName: 'Meal',
        sequelize,
    },
);

export default Meal;
