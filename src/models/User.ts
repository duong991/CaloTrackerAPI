import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import { UserAttributes } from '../interfaces/models/model.interface';
import UserInfo from './UserInfo';
import UserWeightHistory from './UserWeightHistory';
import UserExercise from './UserExercise';
import WaterLog from './WaterLog';
import UserFood from './UserFood';
import UserMeal from './UserMeal';
import DailyMenu from './DailyCalo';
import UserMenu from './UserMenu';
import Token from './Token';
class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
    public role!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        User.hasOne(UserInfo, { foreignKey: 'userId', as: 'userInfo' });
        User.hasMany(UserExercise, {
            foreignKey: 'userId',
            as: 'userExercises',
        });
        User.hasMany(UserWeightHistory, {
            foreignKey: 'userId',
            as: 'userWeightHistories',
        });
        User.hasMany(WaterLog, {
            foreignKey: 'userId',
            as: 'waterLogs',
        });
        User.hasMany(UserFood, {
            foreignKey: 'userId',
            as: 'userFoods',
        });
        User.hasMany(UserMeal, {
            foreignKey: 'userId',
            as: 'userMeals',
        });
        User.hasMany(UserMenu, {
            foreignKey: 'userId',
            as: 'userMenus',
        });
        User.hasMany(DailyMenu, {
            foreignKey: 'userId',
            as: 'dailyMenus',
        });
        User.hasMany(Token, {
            foreignKey: 'userId',
            as: 'tokens',
        });
    };
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        modelName: 'User',
        timestamps: true,
        sequelize,
    },
);

export default User;
