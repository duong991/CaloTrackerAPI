import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';

import Meal from './Meal';
import Food from './Food';
import { MealFoodAttributes } from '../interfaces/models/model.interface';

class MealFood extends Model<MealFoodAttributes> implements MealFoodAttributes {
    public id!: number;
    public mealId!: number;
    public foodId!: number;
    public servingSize!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        MealFood.belongsTo(Meal, { foreignKey: 'mealId', as: 'Meal' });
        MealFood.belongsTo(Food, { foreignKey: 'foodId', as: 'Food' });
    };
}

MealFood.init(
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
                model: Meal,
                key: 'id',
            },
        },
        foodId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Food,
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
        modelName: 'MealFood',
        tableName: 'Meal_Foods',
    },
);

export default MealFood;
