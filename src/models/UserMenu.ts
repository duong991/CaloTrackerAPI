import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';

import User from './User';
import DailyMenu from './DailyCalo';
import DailyCaloFoodMapping from './DailyCaloFoodMapping';

import { UserMenuAttributes } from '../interfaces/models/model.interface';
import UserMealMenu from './UserMealMenu';
class UserMenu extends Model<UserMenuAttributes> implements UserMenuAttributes {
    public id!: number;
    public userId!: number;
    public name!: string;
    public description?: string;

    // các trường timestamp
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        UserMenu.hasMany(DailyMenu, {
            foreignKey: 'menuId',
            as: 'dailyMenus',
            onDelete: 'CASCADE',
        });
        UserMenu.hasMany(UserMealMenu, {
            foreignKey: 'menuId',
            as: 'userMealMenus',
            onDelete: 'CASCADE',
        });

        UserMenu.belongsTo(User, { foreignKey: 'userId', as: 'user' });
        UserMenu.hasMany(DailyCaloFoodMapping, {
            foreignKey: 'userMealId',
            as: 'dailyCaloFoodMappings',
        });
    };
}

UserMenu.init(
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
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'UserMenu',
        tableName: 'User_Menus',
    },
);
export default UserMenu;
