import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';

import User from './User';
import DailyMenu from './DailyMenu';
import { MenuAttributes } from '~/interfaces/models/model.interface';
import UserMealMenu from './UserMealMenu';
class UserMenu extends Model {
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
            as: 'DailyMenu',
            onDelete: 'CASCADE',
        });
        UserMenu.hasMany(UserMealMenu, {
            foreignKey: 'menuId',
            as: 'UserMealMenu',
            onDelete: 'CASCADE',
        });

        UserMenu.belongsTo(User, { foreignKey: 'userId', as: 'User' });
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
