import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import { CaloConsumedMappingAttributes } from '../interfaces/models/model.interface';
import Exercise from './Exercise';
import DailyCalo from './DailyCalo';
class CaloConsumedMapping
    extends Model<CaloConsumedMappingAttributes>
    // eslint-disable-next-line prettier/prettier
    implements CaloConsumedMappingAttributes {
    public id!: number;
    public dailyCaloId!: number;
    public exerciseId?: number;
    public duration?: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        CaloConsumedMapping.belongsTo(Exercise, {
            foreignKey: 'exerciseId',
            as: 'exercise',
        });
        CaloConsumedMapping.belongsTo(DailyCalo, {
            foreignKey: 'dailyCaloId',
            as: 'dailyCalo',
        });
    };
}

CaloConsumedMapping.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        dailyCaloId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: DailyCalo,
                key: 'id',
            },
        },
        exerciseId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Exercise,
                key: 'id',
            },
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'CaloConsumedMapping',
        tableName: 'calo_consumed_mappings',
    },
);

export default CaloConsumedMapping;
