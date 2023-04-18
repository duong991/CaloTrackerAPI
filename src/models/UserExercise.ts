import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import User from './User';
import Exercise from './Exercise';

class UserExercise extends Model {
    public id!: number;
    public userId!: number;
    public exerciseId!: number;
    public date!: Date;
    public duration!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        UserExercise.belongsTo(User, {
            foreignKey: 'userId',
            as: 'User',
        });

        UserExercise.belongsTo(Exercise, {
            foreignKey: 'exerciseId',
            as: 'Exercise',
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
            type: DataTypes.DATEONLY,
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
