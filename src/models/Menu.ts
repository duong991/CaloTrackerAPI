import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/connectDB';
import MealMenu from './MealMenu';
import DailyMenu from './DailyMenu';
import { MenuAttributes } from '../interfaces/models/model.interface';
class Menu extends Model<MenuAttributes> implements MenuAttributes {
    public id!: number;
    public userId!: number;
    public name!: string;
    public description!: string;

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
    },
    {
        sequelize,
        modelName: 'Menu',
    },
);

export default Menu;
