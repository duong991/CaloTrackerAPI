import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import UserInfo from './UserInfo';
import UserWeightHistory from './UserWeightHistory';
import UserExercise from './UserExercise';
import WaterLog from './WaterLog';
import UserFood from './UserFood';
import UserMeal from './UserMeal';
import DailyMenu from './DailyMenu';
import UserMenu from './UserMenu';
import Token from './Token';
class User extends Model {
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
            as: 'UserExercise',
        });
        User.hasMany(UserWeightHistory, {
            foreignKey: 'userId',
            as: 'UserWeightHistory',
        });
        User.hasMany(WaterLog, {
            foreignKey: 'userId',
            as: 'WaterLog',
        });
        User.hasMany(UserFood, {
            foreignKey: 'userId',
            as: 'UserFood',
        });
        User.hasMany(UserMeal, {
            foreignKey: 'userId',
            as: 'UserMeal',
        });
        User.hasMany(UserMenu, {
            foreignKey: 'userId',
            as: 'UserMenu',
        });
        User.hasMany(DailyMenu, {
            foreignKey: 'userId',
            as: 'DailyMenu',
        });
        User.hasMany(Token, {
            foreignKey: 'userId',
            as: 'Token',
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
