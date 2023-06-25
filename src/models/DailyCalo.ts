import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import { DailyCaloAttributes } from '../interfaces/models/model.interface';
import User from './User';
import CaloIntakeMapping from './CaloIntakeMapping';
import CaloConsumedMapping from './CaloConsumedMapping';
class DailyCalo
    extends Model<DailyCaloAttributes>
    // eslint-disable-next-line prettier/prettier
    implements DailyCaloAttributes {
    public id!: number;
    public userId!: number;
    public date!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        DailyCalo.hasMany(CaloIntakeMapping, {
            foreignKey: 'dailyCaloId',
            as: 'caloIntakeMappings',
        });
        DailyCalo.hasMany(CaloConsumedMapping, {
            foreignKey: 'dailyCaloId',
            as: 'caloConsumedMappings',
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
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'DailyCalo',
        tableName: 'daily_calos',
    },
);

export default DailyCalo;
