import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import { DailyCaloAttributes } from '../interfaces/models/model.interface';
import User from './User';
import DailyCaloFoodMapping from './DailyCaloFoodMapping';

class DailyCalo
    extends Model<DailyCaloAttributes>
    // eslint-disable-next-line prettier/prettier
    implements DailyCaloAttributes {
    public id!: number;
    public userId!: number;
    public totalCalo!: number;
    public date!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        DailyCalo.hasMany(DailyCaloFoodMapping, {
            foreignKey: 'dailyCaloId',
            as: 'dailyCaloFoodMappings',
        });

        DailyCalo.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    };
}

DailyCalo.init(
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
        totalCalo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'DailyCalo',
        tableName: 'Daily_Calos',
    },
);

export default DailyCalo;
