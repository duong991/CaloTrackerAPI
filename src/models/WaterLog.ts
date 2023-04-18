import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import User from './User';

class WaterLog extends Model {
    public id!: number;
    public userId!: number;
    public date!: Date;
    public amount!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        WaterLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    };
}

WaterLog.init(
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
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        modelName: 'WaterLog',
        tableName: 'Water_Logs',
        sequelize,
    },
);

export default WaterLog;
