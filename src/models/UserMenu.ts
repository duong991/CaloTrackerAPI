import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';

import User from './User';
import DailyMenu from './DailyMenu';
import { MenuAttributes } from '~/interfaces/models/modal.interface';
import UserMealMenu from './UserMealMenu';
class UserMenu extends Model<MenuAttributes> implements MenuAttributes {
    public id!: number;
    public userId!: number;
    public name!: string;
    public description!: string;
    public mealType!: 'breakfast' | 'lunch' | 'dinner' | 'snacks';

    // các trường timestamp
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        UserMenu.hasMany(DailyMenu, {
            foreignKey: {
                name: 'menuId',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
        UserMenu.hasMany(UserMealMenu, {
            foreignKey: {
                name: 'menuId',
                allowNull: false,
            },
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
        mealType: {
            type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snacks'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'UserMenu',
        tableName: 'User_Menus',
    },
);
export default UserMenu;
