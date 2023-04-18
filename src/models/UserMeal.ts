import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import UserMealFood from './UserMealFood';
import User from './User';
import UserMealMenu from './UserMealMenu';

class UserMeal extends Model {
    public id!: number;
    public userId!: number;
    public name!: string;
    public description!: string;
    public image!: Buffer;
    public calories!: number;
    public protein!: number;
    public carbohydrates!: number;
    public fat!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        UserMeal.belongsTo(User, { foreignKey: 'userId', as: 'User' });
        UserMeal.hasMany(UserMealFood, {
            foreignKey: 'mealId',
            as: 'UserMealFood',
        });
        UserMeal.hasMany(UserMealMenu, {
            foreignKey: 'userMealId',
            as: 'UserMealMenu',
        });
    };
}

UserMeal.init(
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
                model: User,
                key: 'id',
            },
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        sequelize,
        modelName: 'UserMeal',
        tableName: 'user_meals',
    },
);

export default UserMeal;
