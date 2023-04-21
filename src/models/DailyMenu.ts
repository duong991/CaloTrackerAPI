import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import User from './User';
import { DailyMenuAttributes } from '../interfaces/models/modal.interface';
import Menu from './Menu';
import UserMenu from './UserMenu';

class DailyMenu
    extends Model<DailyMenuAttributes>
    // eslint-disable-next-line prettier/prettier
    implements DailyMenuAttributes {
    public id!: number;
    public userId!: number;
    public menuId?: number;
    public userMenuId?: number;
    public date!: Date;
    public note?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        DailyMenu.belongsTo(Menu, {
            foreignKey: 'menuId',
            as: 'Menu',
        });
        DailyMenu.belongsTo(UserMenu, {
            foreignKey: 'userMenuId',
            as: 'UserMenu',
        });

        DailyMenu.belongsTo(User, { foreignKey: 'userId', as: 'User' });
    };
}

DailyMenu.init(
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
        menuId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Menu,
                key: 'id',
            },
        },
        userMenuId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UserMenu,
                key: 'id',
            },
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'DailyMenu',
        tableName: 'Daily_Menus',
    },
);

export default DailyMenu;
