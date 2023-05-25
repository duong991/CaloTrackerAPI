import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import User from './User';
import { UserInfoAttributes } from '../interfaces/models/model.interface';
class UserInfo extends Model<UserInfoAttributes> implements UserInfoAttributes {
    public id?: number;
    public userId!: number;
    public weight!: number;
    public height!: number;
    public gender!: boolean;
    public activityLevel!: string;
    public BMR!: number;
    public target!: 'Giảm cân' | 'Tăng cân' | 'Giữ nguyên cân nặng';
    public lastTimeToUpdate!: string;
    public protein!: number;
    public fat!: number;
    public carb!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        UserInfo.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    };
}

UserInfo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: User,
                key: 'id',
            },
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        height: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        gender: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        activityLevel: {
            type: DataTypes.ENUM(
                'sedentary',
                'moderatelyActive',
                'active',
                'veryActive',
            ),
            allowNull: false,
        },
        BMR: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        target: {
            type: DataTypes.ENUM('Giảm cân', 'Tăng cân', 'Giữ nguyên cân nặng'),
            allowNull: false,
        },
        lastTimeToUpdate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        protein: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        fat: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        carb: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        modelName: 'UserInfo',
        tableName: 'User_Infos',
        sequelize,
    },
);

export default UserInfo;
