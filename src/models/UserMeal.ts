import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import UserMealFood from './UserMealFood';
import User from './User';
// import UserMealMenu from './UserMealMenu';
import CaloIntakeMapping from './CaloIntakeMapping';
import { UserMealAttributes } from '../interfaces/models/model.interface';
class UserMeal extends Model<UserMealAttributes> implements UserMealAttributes {
    public id!: number;
    public userId!: number;
    public name!: string;
    public description?: string;
    public image?: Blob;
    public calories!: number;
    public protein!: number;
    public carbohydrates!: number;
    public fat!: number;
    public mealType!: 'breakfast' | 'lunch' | 'dinner' | 'snack';

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = (): void => {
        UserMeal.belongsTo(User, { foreignKey: 'userId', as: 'User' });
        UserMeal.hasMany(UserMealFood, {
            foreignKey: 'mealId',
            as: 'userMealFoods',
        });
        // UserMeal.hasMany(UserMealMenu, {
        //     foreignKey: 'userMealId',
        //     as: 'userMealMenus',
        // });
        UserMeal.hasMany(CaloIntakeMapping, {
            foreignKey: 'userMealId',
            as: 'caloIntakeMappings',
        });
    };
}

UserMeal.init(
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
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        calories: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        protein: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        carbohydrates: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        fat: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        mealType: {
            type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'UserMeal',
        tableName: 'user_meals',
    },
);

export default UserMeal;
