import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import User from './User';
import Exercise from './Exercise';
import { UserExrAttributes } from '../interfaces/models/model.interface';
class UserExercise
    extends Model<UserExrAttributes>
    // eslint-disable-next-line prettier/prettier
    implements UserExrAttributes {
    public id!: number;
    public userId!: number;
    public exerciseId!: number;
    public date!: string;
    public duration!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        UserExercise.belongsTo(User, {
            foreignKey: 'userId',
            as: 'user',
        });

        UserExercise.belongsTo(Exercise, {
            foreignKey: 'exerciseId',
            as: 'exercise',
        });
    };
}

UserExercise.init(
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
        exerciseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Exercise,
                key: 'id',
            },
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        modelName: 'UserExercise',
        tableName: 'User_Exercises',
        sequelize,
    },
);

export default UserExercise;
