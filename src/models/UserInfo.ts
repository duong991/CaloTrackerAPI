import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import User from './User';
class UserInfo extends Model {
    public id!: number;
    public userId!: number;
    public weight!: number;
    public height!: number;
    public activityLevel!: string;
    public BMR!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        UserInfo.belongsTo(User, { foreignKey: 'userId' });
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
    },
    {
        modelName: 'UserInfo',
        tableName: 'User_Infos',
        sequelize,
    },
);

export default UserInfo;
