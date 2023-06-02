/* eslint-disable prettier/prettier */
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import User from './User';
import { UserWeightHistoryAttributes } from '../interfaces/models/model.interface';
class UserWeightHistory extends Model<UserWeightHistoryAttributes> implements UserWeightHistoryAttributes {
    public id!: number;
    public userId!: number;
    public date!: string;
    public weight!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        UserWeightHistory.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    };
}

UserWeightHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
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
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },

    },
    {
        modelName: 'UserWeightHistory',
        tableName: 'User_Weight_Histories',
        timestamps: true,
        sequelize,
    },
);

export default UserWeightHistory;
