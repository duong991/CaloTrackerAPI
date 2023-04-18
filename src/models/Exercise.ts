import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import UserExercise from './UserExercise';

class Exercise extends Model {
    public id!: number;
    public name!: string;
    public caloriesBurned!: number;
    public duration!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        Exercise.hasMany(UserExercise, {
            foreignKey: 'exerciseId',
            as: 'UserExercise',
        });
    };
}

Exercise.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        caloriesBurned: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Exercise',
        tableName: 'Exercises',
    },
);

export default Exercise;
