import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connectDB';

import User from './User';
import UserMealFood from './UserMealFood';

class UserFood extends Model {
    public id!: number;
    public userId!: number;
    public name!: string;
    public calories!: number;
    public protein!: number;
    public carbohydrates!: number;
    public fat!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        UserFood.belongsTo(User, {
            foreignKey: 'userId',
            as: 'User',
        });
        UserFood.hasMany(UserMealFood, {
            foreignKey: 'mealId',
            as: 'UserMealFood',
        });
    };
}

UserFood.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING,
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
    },
    {
        modelName: 'UserFood',
        tableName: 'User_Foods',
        sequelize,
    },
);

export default UserFood;
