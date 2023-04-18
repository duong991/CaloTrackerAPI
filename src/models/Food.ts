import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import MealFood from './MealFood';
import UserMealFood from './UserMealFood';

class Food extends Model {
    public id!: number;
    public name!: string;
    public calories!: number;
    public protein!: number;
    public carbohydrates!: number;
    public fat!: number;
    public food_type!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        Food.hasMany(MealFood, { foreignKey: 'foodId', as: 'MealFood' });
        Food.hasMany(UserMealFood, {
            foreignKey: 'foodId',
            as: 'UserMealFood',
        });
    };
}

Food.init(
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
        foodType: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        modelName: 'Food',
        tableName: 'Foods',
        sequelize,
    },
);

export default Food;
