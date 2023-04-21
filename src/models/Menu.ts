import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connectDB';
import MealMenu from './MealMenu';
import DailyMenu from './DailyMenu';
import { MenuAttributes } from '../interfaces/models/modal.interface';
class Menu extends Model<MenuAttributes> implements MenuAttributes {
    public id!: number;
    public userId!: number;
    public name!: string;
    public description!: string;
    public mealType!: 'breakfast' | 'lunch' | 'dinner' | 'snacks';

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        Menu.hasMany(MealMenu, { foreignKey: 'menuId', as: 'MealMenu' });
        Menu.hasMany(DailyMenu, {
            foreignKey: {
                name: 'menuId',
                allowNull: false,
            },
            onDelete: 'CASCADE',
        });
    };
}

Menu.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        mealType: {
            type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snacks'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Menu',
    },
);

export default Menu;
