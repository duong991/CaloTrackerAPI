import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import User from './User';

class UserWeightHistory extends Model {
    public id!: number;
    public userId!: number;
    public date!: number;
    public weight!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        UserWeightHistory.belongsTo(User, { foreignKey: 'userId' });
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
            type: DataTypes.DATE,
            allowNull: false,
        },
        role: {
            type: DataTypes.BOOLEAN,
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
